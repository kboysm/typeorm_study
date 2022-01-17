import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("board")
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "varchar", length: 5000 })
  content: string;

  @Column({ type: "varchar" })
  user_id: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: string;
}
