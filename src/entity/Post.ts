import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import Model from "./Model";
@Entity("posts")
export class Post extends Model {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User)
  user: User;
}
