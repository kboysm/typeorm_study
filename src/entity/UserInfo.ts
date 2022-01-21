import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("user_info")
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  address: string;

  @Column({ type: "varchar", length: 25 })
  name: string;

  @Column()
  age: number;

  @Column({ type: "varchar", default: null })
  user_id: string;

  @OneToOne(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
