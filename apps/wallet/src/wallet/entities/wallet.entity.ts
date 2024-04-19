import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  currency: string;

  @Column()
  walletID: string;

  @Column()
  amount: string;
}
