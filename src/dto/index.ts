import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsString,
  MinLength,
  MaxLength,
  NotContains,
  ValidateNested,
  IsEnum,
  IsNumber,
  IsUrl,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
class UserInfoDto {
  @IsString()
  address: string;
  @IsString()
  name: string;
  @IsInt()
  age: number;
}
class LoginDto {
  email: string;
  password: string;
}

class UserDto {
  @IsEmail()
  email: string;
  password: string;
  @IsOptional()
  @IsString()
  userInfoId: string;
  @ValidateNested({ each: true, message: "userInfo에러" })
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto;

  // createService
  get getUser() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  get checkExistUser() {
    return this.email || this.password;
  }
  get checkExistUserInfo() {
    return this.userInfo;
  }

  // updateService - User
  getUpdatedUser() {
    const userKey = ["email", "password"];
    const result = {};
    userKey.forEach((key) => {
      if (this[key]) result[key] = this[key];
    });
    return result;
  }

  // updateServuce - UserInfo
  getUpdatedUserInfo() {
    const userInfoKey = ["address", "name", "age"];
    const result = {};
    userInfoKey.forEach((key) => {
      if (this?.userInfo[key]) result[key] = this?.userInfo[key];
    });
    return result;
  }
}

export { UserDto, LoginDto };
