import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// User entity
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

  @Column({ nullable: true })
  localBankAccount: string;
}
