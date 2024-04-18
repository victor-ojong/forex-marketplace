import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface Balance {
  currency: string;
  amount: number;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: 0.0 })
  balance: Balance[];

  @Column({ nullable: true })
  localBankAccount: string;
}
