import { createQueryBuilder, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { UserDto } from "../dto/index";
import { User } from "../entity";
import { PageReq } from "../api/PageReq";

@Service()
@EntityRepository(User)
export class UserQueryRepo {
  findAll(param: PageReq) {
    return (
      createQueryBuilder("user")
        .leftJoinAndSelect("User.userInfo", "info")
        // .select("user")
        // .from(User, "user")
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount()
    );
  }

  findOne(id: number) {
    return createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("id = :id", { id })
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

  // create(paramObj: UserDto) {
  //   return createQueryBuilder().insert().into(User).values(paramObj).execute();
  // }

  // update(paramObj: UserDto, id: number) {
  //   return createQueryBuilder()
  //     .update(User)
  //     .set(paramObj)
  //     .where("id = :id", { id })
  //     .execute();
  // }

  delete(id: number) {
    return createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }
}
