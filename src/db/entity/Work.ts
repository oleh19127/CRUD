import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.works)
  user: User;
}
