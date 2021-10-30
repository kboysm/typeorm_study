import { Entity, Column, OneToMany } from "typeorm";
import Model from "./Model";
import { Post } from "./Post";

@Entity("users")
export class User extends Model {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor() {
    super();
  }
  static signup(name: string, email: string, role: string): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.role = role;
    return user;
  }
}
