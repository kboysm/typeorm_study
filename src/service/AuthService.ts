import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PageReq } from "../api/PageReq";
import { UserQueryRepo } from "../repository/UserQueryRepo";
import { User, UserInfo } from "../entity";
import { LoginDto } from "../dto";
import { PageResObj } from "../api/PageResObj";
import { generateAccessToken } from "../middlewares";
@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    readonly userQueryRepo: UserQueryRepo
  ) {}

  async login(loginDto: LoginDto): Promise<PageResObj<string>> {
    // const findByUserEmail: User = await this.userQueryRepo.findOne(id);
    const findByUserEmail: User = await this.userQueryRepo.findByEmail(
      loginDto.email
    );
    if (!findByUserEmail) throw new Error("이메일이 존재하지 않습니다.");
    if (findByUserEmail.password !== loginDto.password) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    const token = generateAccessToken(findByUserEmail);
    return new PageResObj(token, "로그인에 성공했습니다.");
  }

  async getUserInfo(id: number): Promise<PageResObj<User | {}>> {
    // const findByUserEmail: User = await this.userQueryRepo.findOne(id);
    const user = await this.userQueryRepo.findOne(id);

    return new PageResObj(user, "로그인한 유저의 정보입니다.");
  }
}
