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

  get getUser() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export { UserDto };
