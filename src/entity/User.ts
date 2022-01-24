import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 100, unique: true })
  email: string;
  @Column({ type: "varchar", length: 200, select: false })
  password: string;
  @Column({ type: "int", default: null })
  userInfoId: number;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userInfoId" })
  userInfo: UserInfo;
}
