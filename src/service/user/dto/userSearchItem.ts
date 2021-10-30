import { User } from "../../../entity/User";

export class UserSearchItem {
  created_at: Date;
  name: string;
  email: string;

  constructor(entity: User) {
    this.created_at = entity.created_at;
    this.name = entity.name;
    this.email = entity.email;
  }
}
