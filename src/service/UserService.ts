import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PageReq } from "../api/PageReq";
import { UserQueryRepo } from "../repository/UserQueryRepo";
import { User, UserInfo } from "../entity";
import { UserDto } from "../dto";
import { EntityManager, Transaction, TransactionManager } from "typeorm";
import { PageResList } from "../api/PageResList";
import { PageResObj } from "../api/PageResObj";

@Service()
export class UserService {
  constructor(
    @InjectRepository()
    readonly userQueryRepo: UserQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<User>> {
    const result: [User[], number] = await this.userQueryRepo.findAll(param);
    return new PageResList<User>(
      result[1],
      param.limit,
      result[0],
      "User 목록을 찾는데 성공했습니다"
    );
  }

  // async search(param: AdminSearchReq): Promise<PageResList<User>> {
  //   const result = await this.userQueryRepo.search(param);
  //   return new PageResList<User>(
  //     result[1],
  //     param.limit,
  //     result[0].map((el: User) => {
  //       return el;
  //     }),
  //     "User 목록을 찾는데 성공했습니다"
  //   );
  // }

  async findOne(id: number): Promise<PageResObj<User>> {
    const result: User = await this.userQueryRepo.findOne(id);
    return new PageResObj(result, "User를 찾는데 성공했습니다.");
  }

  @Transaction()
  async create(
    paramObj: UserDto,
    @TransactionManager() manager: EntityManager
  ): Promise<PageResObj<User>> {
    const createedUser = await manager.insert(User, paramObj.getUser);
    const createedUserInfo = await manager.insert(UserInfo, {
      ...paramObj.userInfo,
      user_id: createedUser.identifiers[0].id,
    });
    await manager.update(
      User,
      { id: createedUser.identifiers[0].id },
      { userInfoId: createedUserInfo.identifiers[0].id }
    );
    const result: User = await manager.findOne(
      User,
      { id: createedUser.identifiers[0].id },
      { relations: ["userInfo"] }
    );
    return new PageResObj(result, "User 생성에 성공했습니다.");
  }

  async update(paramObj: UserDto, id: number): Promise<PageResObj<User>> {
    await this.userQueryRepo.update(paramObj, id);
    const result = await this.userQueryRepo.findOne(id);
    return new PageResObj(result, "User 정보 수정에 성공했습니다.");
  }

  async delete(id: number) {
    const result = await this.userQueryRepo.findOne(id);
    const { affected } = await this.userQueryRepo.delete(id);
    return new PageResObj(
      result,
      affected === 0 ? "User 삭제에 실패했습니다." : "User 삭제에 성공했습니다."
    );
  }
}
