import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User.entity';
import { Menu } from './Menu.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column('int')
  peopleCount: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  customer: User;

  @ManyToOne(() => User)
  @JoinColumn()
  restaurant: User;

  @ManyToMany(() => Menu)
  @JoinTable()
  menus: Menu[];
}
