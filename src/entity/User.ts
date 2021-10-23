import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "uuid" })
  uuid: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
