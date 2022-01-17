import { createQueryBuilder, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { UserDto } from "../dto/index";
import { User } from "../entity";
import { PageReq } from "../api/PageReq";

@Service()
@EntityRepository(User)
export class UserQueryRepo {
  findAll(param: PageReq) {
    return createQueryBuilder()
      .select("becon_admin")
      .from(User, "becon_admin")
      .skip(param.getOffset())
      .take(param.getLimit())
      .getManyAndCount();
  }

  findOne(id: number) {
    return createQueryBuilder()
      .select("becon_admin")
      .from(User, "becon_admin")
      .where("id = :id", { id })
      .getOne();
  }

  findByEmail(email: string) {
    return createQueryBuilder()
      .select("becon_admin")
      .addSelect("becon_admin.password")
      .from(User, "becon_admin")
      .where("email = :email", { email })
      .getOne();
  }

  // create(paramObj: UserDto) {
  //   paramObj.password = hash(paramObj.password);
  //   return createQueryBuilder()
  //     .insert()
  //     .into(User)
  //     .values(paramObj.getUpdateData())
  //     .execute();
  // }

  // update(paramObj: UserDto, id: number) {
  //   if (paramObj.password) {
  //     paramObj.password = hash(paramObj.password);
  //   }
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
