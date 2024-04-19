import { Entity, Column, ObjectIdColumn, ObjectId, BaseEntity } from 'typeorm';

@Entity()
export class Transactions extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  walletID: string;

  @Column()
  type: 'sell' | 'buy';

  @Column()
  currencyPair: string;

  @Column()
  timestamp: Date;

  @Column()
  sellPrice: number;

  @Column()
  buyPrice: number;
}
