import {
  Injectable, ForbiddenException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entity/Menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuForm } from './forms';
import { User } from '../entity/User.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
  ) {}

  async createMenu(user: User, dto: CreateMenuForm) {
    if (user.role !== 'RESTAURANT') {
      throw new ForbiddenException('식당 계정만 메뉴를 등록할 수 있습니다.');
    }
    const menu = this.menuRepo.create({ ...dto, restaurant: user });
    return await this.menuRepo.save(menu);
  }

  async getMenus(user: User, query: any) {
    const qb = this.menuRepo.createQueryBuilder('menu')
      .where('menu.restaurantId = :restaurantId', { restaurantId: user.id });

    if (query.name) {
      qb.andWhere('menu.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.minPrice) {
      qb.andWhere('menu.price >= :minPrice', { minPrice: Number(query.minPrice) });
    }
    if (query.maxPrice) {
      qb.andWhere('menu.price <= :maxPrice', { maxPrice: Number(query.maxPrice) });
    }

    return qb.getMany();
  }

  async deleteMenu(user: User, id: number) {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ['restaurant'],
    });

    if (!menu || menu.restaurant.id !== user.id) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return await this.menuRepo.remove(menu);
  }
}
