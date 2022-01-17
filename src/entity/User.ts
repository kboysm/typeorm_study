import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  email: string;
  @Column({ type: "varchar", length: 200 })
  password: string;
  @Column({ type: "varchar", length: 40 })
  name: string;
  @Column()
  age: number;
}
