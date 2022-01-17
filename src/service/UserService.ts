import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PageReq } from "../api/PageReq";
import { UserQueryRepo } from "../repository/UserQueryRepo";
import { User } from "../entity";
import { UserDto } from "../dto";
import { EntityManager, Transaction, TransactionManager } from "typeorm";

@Service()
export class AdminService {
  constructor(
    @InjectRepository()
    readonly userQueryRepo: UserQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<User>> {
    const result = await this.userQueryRepo.findAll(param);
    return new PageResList<User>(
      result[1],
      param.limit,
      result[0].map((el: User) => {
        return el;
      }),
      "User 목록을 찾는데 성공했습니다"
    );
  }

  async search(param: AdminSearchReq): Promise<PageResList<User>> {
    const result = await this.userQueryRepo.search(param);
    return new PageResList<User>(
      result[1],
      param.limit,
      result[0].map((el: User) => {
        return el;
      }),
      "User 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(admin_id: string): Promise<PageResObj<User | {}>> {
    const result = await this.userQueryRepo.findOne(
      this.SCHEMA_NAME,
      this.SCHEMA_CLASS_NAME,
      "admin_id",
      admin_id
    );
    return new PageResObj(result, "admin를 찾는데 성공했습니다.");
  }
}
