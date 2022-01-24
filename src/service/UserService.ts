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
    const result = await this.userQueryRepo.findAll(param);
    return new PageResList<User>(
      result[1],
      param.limit,
      result[0].map((el: User) => el),
      "User 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<User | {}>> {
    const result = await this.userQueryRepo.findOne(id);
    return new PageResObj(result, "User를 찾는데 성공했습니다.");
  }

  @Transaction()
  async create(
    paramObj: UserDto,
    @TransactionManager() manager: EntityManager
  ): Promise<PageResObj<User>> {
    const createedUserInfo = await manager.insert(UserInfo, {
      ...paramObj.userInfo,
    });
    const createedUser = await manager.insert(User, {
      ...paramObj.getUser,
      userInfoId: createedUserInfo.identifiers[0].id,
    });
    const result: User = await manager.findOne(
      User,
      { id: createedUser.identifiers[0].id },
      { relations: ["userInfo"] }
    );
    return new PageResObj(result, "User 생성에 성공했습니다.");
  }

  @Transaction()
  async update(
    paramObj: UserDto,
    id: number,
    @TransactionManager() manager: EntityManager
  ): Promise<PageResObj<User>> {
    const oldUser: User = await manager.findOne(
      User,
      { id },
      { relations: ["userInfo"] }
    );

    if (paramObj.checkExistUser) {
      await manager.update(User, { id }, { ...paramObj.getUpdatedUser() });
    }
    if (paramObj.checkExistUserInfo) {
      await manager.update(
        UserInfo,
        { id: oldUser.userInfoId },
        { ...paramObj.getUpdatedUserInfo() }
      );
    }
    const result: User = await manager.findOne(
      User,
      { id },
      { relations: ["userInfo"] }
    );
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
