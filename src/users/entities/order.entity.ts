import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.products) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity = item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => item !== null)
        .reduce((total, item) => {
          const itemTotal = item.product.price * item.quantity;
          return total + itemTotal;
        }, 0);
    }
    return 0;
  }
}
