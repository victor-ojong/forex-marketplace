import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  walletID: string;

  @Column({ nullable: true })
  localBankAccount: string;
}
