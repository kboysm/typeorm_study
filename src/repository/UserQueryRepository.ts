import { createQueryBuilder, EntityRepository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserQueryRepository {
  findAll() {
    const result = createQueryBuilder()
      .select("users")
      .from(User, "users")
      .getMany();
    console.log(JSON.stringify(result));
    return result;
  }

  findOneById(id: number) {
    return createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id })
      .getOne();
  }

  findOneByName(name: string) {
    return createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.name = :name", { name })
      .getOne();
  }
}
