import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  user: User;

  products: Product[];
}
