import { createQueryBuilder, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { User } from "../entity";
import { PageReq } from "../api/PageReq";

@Service()
@EntityRepository(User)
export class UserQueryRepo {
  findAll(param: PageReq) {
    return createQueryBuilder("user")
      .leftJoinAndSelect("User.userInfo", "info")
      .skip(param.getOffset())
      .take(param.getLimit())
      .getManyAndCount();
  }

  findOne(id: number) {
    return createQueryBuilder("user")
      .leftJoinAndSelect("User.userInfo", "info")
      .where("User.id = :id", { id })
      .getOne();
  }
  // .addSelect("user.password")가 있다는건 비밀번호 비교용 함수, 외부노출 api에 사용금지
  findByEmail(email: string) {
    return createQueryBuilder()
      .select("user")
      .addSelect("user.password")
      .from(User, "user")
      .where("email = :email", { email })
      .getOne();
  }

  delete(id: number) {
    return createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }
}
