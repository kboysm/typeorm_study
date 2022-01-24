import { AuthService } from "../service//AuthService";
import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  QueryParams,
  Patch,
  Res,
  Delete,
  UseBefore,
} from "routing-controllers";
import { Response } from "express";
import { Inject, Service } from "typedi";
import { LoginDto } from "../dto";
import { PageReq, PageResObj, PageResList } from "../api";
import { QueryFailedError } from "typeorm";
import { CustomValidation, IdValidation } from "../class/CustomValidation";
import { checkAccessToken } from "../middlewares";
@Service()
@JsonController("/auth")
export class UserController {
  @Inject()
  authService: AuthService;
  // constructor(private userService: UserService) {}

  @Post("/login")
  public async create(@Body() loginDto: LoginDto, @Res() res: Response) {
    const validationResult = await new CustomValidation(
      loginDto
    ).checkValidation();
    if (validationResult) return validationResult;

    try {
      return await this.authService.login(loginDto);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }

  @Get("/user")
  @UseBefore(checkAccessToken)
  public async getOne(@Res() res: Response) {
    try {
      const { sub } = res.locals.jwtPayload;
      return await this.authService.getUserInfo(sub);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }
}
