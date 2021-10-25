import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Order {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  user: User;

  products: Product[];
}
