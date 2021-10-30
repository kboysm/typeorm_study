import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserQueryRepository } from "../../repository/UserQueryRepository";
// import { Transaction, TransactionManager } from "typeorm";
import { User } from "../../entity/User";
// import { UserSearchRequest } from "../../controller/user/dto/UserSearchRequest";
// import { Page } from "../Page";

// import { UserSearchItem } from "./dto/userSearchItem";

@Service()
export class UserService {
  constructor(
    @InjectRepository() private userQueryRepository: UserQueryRepository
  ) {
    console.log("service create");
  }

  async findAll(): Promise<User[]> {
    return await this.userQueryRepository.findAll();
  }
}
