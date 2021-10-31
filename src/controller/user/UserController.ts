import { UserService } from "../../service/user/UserService";
import { UserQueryRepository } from "../../repository/UserQueryRepository";
import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  QueryParams,
  Res,
} from "routing-controllers";
import { Response } from "express";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  public async get(@Res() res: Response) {
    try {
      // const userQueryRepository = new UserQueryRepository();
      // const result = await userQueryRepository.findAll();
      // return result;
      return this.userService.findAll();
    } catch (err) {
      return err;
    }
  }
}
