import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  price: number;

  @Column({ type: 'enum', enum: ['한식', '중식', '일식'] })
  category: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn()
  restaurant: User;
}
