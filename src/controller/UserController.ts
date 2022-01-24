import { UserService } from "../service//UserService";
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
import { UserDto } from "../dto";
import { PageReq, PageResObj, PageResList } from "../api";
import { QueryFailedError } from "typeorm";
import { CustomValidation, IdValidation } from "../class/CustomValidation";

@Service()
@JsonController("/user")
export class UserController {
  @Inject()
  userService: UserService;
  // constructor(private userService: UserService) {}

  @Get("/findall")
  public async get(@QueryParams() param: PageReq, @Res() res: Response) {
    try {
      return await this.userService.findAll(param);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }

  @Get("/findone/:id")
  public async getOne(@Param("id") id: number, @Res() res: Response) {
    const validationResult = new IdValidation(id, "number");
    if (!validationResult.result) {
      return validationResult.getRes();
    }
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }

  @Post("/create")
  public async create(@Body() createDto: UserDto, @Res() res: Response) {
    const validationResult = await new CustomValidation(
      createDto
    ).checkValidation();
    if (validationResult) return validationResult;

    try {
      return await this.userService.create(createDto, null);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }

  @Patch("/update/:id")
  public async update(
    @Body() updateDto: UserDto,
    @Param("id") id: number,
    @Res() res: Response
  ) {
    const validationResult = await new CustomValidation(
      updateDto
    ).checkUpdateDtoValidation();
    if (validationResult) return validationResult;
    const idValidationResult = new IdValidation(id, "number");
    if (!idValidationResult.result) {
      return idValidationResult.getRes();
    }
    try {
      return await this.userService.update(updateDto, id, null);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }
  @Delete("/delete/:id")
  public async delete(@Param("id") id: number) {
    const validationResult = new IdValidation(id, "number");
    if (!validationResult.result) {
      return validationResult.getRes();
    }
    try {
      return await this.userService.delete(id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.log("Instance of QueryFailedError!");
        return new PageResObj({}, err.message, true);
      }
      return new PageResObj({}, err.message, true);
    }
  }
}
