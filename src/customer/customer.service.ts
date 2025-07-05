import {
  Injectable, ForbiddenException, NotFoundException, BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entity/Reservation.entity';
import { User } from '../entity/User.entity';
import { Menu } from '../entity/Menu.entity';
import { CreateReservationForm, UpdateReservationForm } from './forms';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
  ) {}

  async createReservation(user: User, dto: CreateReservationForm) {
    const restaurant = await this.userRepo.findOneBy({
      id: dto.restaurantId,
      role: 'RESTAURANT',
    });
    if (!restaurant) throw new NotFoundException('식당이 존재하지 않습니다.');

    const overlapping = await this.reservationRepo
      .createQueryBuilder('r')
      .where('r.restaurantId = :restaurantId', { restaurantId: restaurant.id })
      .andWhere('r.startTime < :end AND r.endTime > :start', {
        start: dto.startTime,
        end: dto.endTime,
      })
      .getOne();

    if (overlapping) {
      throw new BadRequestException('예약 시간이 겹칩니다.');
    }

    const menus = await this.menuRepo.findByIds(dto.menus);
    if (!menus.length) {
      throw new BadRequestException('유효한 메뉴가 없습니다.');
    }

    const reservation = this.reservationRepo.create({
      phone: dto.phone,
      peopleCount: dto.peopleCount,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      customer: user,
      restaurant,
      menus,
    });

    return this.reservationRepo.save(reservation);
  }

  async updateReservation(user: User, id: number, dto: UpdateReservationForm) {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['customer', 'menus'],
    });
    if (!reservation || reservation.customer.id !== user.id) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    const menus = await this.menuRepo.findByIds(dto.menus);
    reservation.peopleCount = dto.peopleCount;
    reservation.menus = menus;
    return this.reservationRepo.save(reservation);
  }

  async deleteReservation(user: User, id: number) {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!reservation || reservation.customer.id !== user.id) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }
    return this.reservationRepo.remove(reservation);
  }

  async getReservations(user: User, query: any) {
    const qb = this.reservationRepo
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.customer', 'c')
      .leftJoinAndSelect('r.restaurant', 'rest')
      .leftJoinAndSelect('r.menus', 'menus');

    if (user.role === 'CUSTOMER') {
      qb.where('r.customerId = :id', { id: user.id });
    } else {
      qb.where('r.restaurantId = :id', { id: user.id });
    }

    if (query.phone) {
      qb.andWhere('r.phone LIKE :phone', { phone: `%${query.phone}%` });
    }
    if (query.minPeople) {
      qb.andWhere('r.peopleCount >= :minPeople', { minPeople: Number(query.minPeople) });
    }
    if (query.date) {
      qb.andWhere('DATE(r.startTime) = :date', { date: query.date });
    }
    if (query.menuId) {
      qb.andWhere('menus.id = :menuId', { menuId: Number(query.menuId) });
    }

    return qb.getMany();
  }
}
