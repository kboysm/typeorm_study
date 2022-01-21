import { validate, ValidationError, isString, isNumber } from "class-validator";
import { PageReq, PageResObj, PageResList } from "../api";

export class CustomValidation {
  dto: object;
  constructor(dto: object) {
    this.dto = dto;
  }

  async checkValidation() {
    const errors: ValidationError[] = await validate(this.dto);
    if (errors.length > 0) {
      const errorMsgArr = errors.map((err) => {
        return {
          property: err.property,
          constraints: err.constraints,
        };
      });
      const result = new PageResObj(
        errorMsgArr,
        "요청 객체를 확인해주세요",
        true
      );
      return result;
    }
    return null;
  }

  async checkUpdateDtoValidation() {
    const errors: ValidationError[] = await validate(this.dto, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      const errorMsgArr = errors.map((err) => {
        return {
          property: err.property,
          constraints: err.constraints,
        };
      });
      const result = new PageResObj(
        errorMsgArr,
        "요청 객체를 확인해주세요",
        true
      );
      return result;
    }
    return null;
  }
}
export class CustomArrayValidation {
  dtoArr: Array<object>;

  constructor(dtoArr: Array<object>) {
    this.dtoArr = dtoArr;
  }

  async checkValidation() {
    let errors: ValidationError[];
    this.dtoArr.forEach(async (dto) => {
      const eachResult = await validate(dto);
      console.log(eachResult);
    });
    // if (errors.length > 0) {
    //   return errors.map((err) => {
    //     return {
    //       property: err.property,
    //       constraints: err.constraints,
    //     };
    //   });
    // }
    return null;
  }
}
export class IdValidation {
  id: number | string;
  idType: string;
  result: boolean = false;
  idName: string;

  constructor(id: number | string, idType: string, idName: string = "id") {
    this.id = id;
    this.idType = idType;
    this.checkValidation();
    this.idName = idName;
  }

  checkValidation() {
    if (this.idType === "string") {
      if (isString(this.id)) {
        this.result = true;
      }
    }
    if (isNumber(this.id)) {
      this.result = true;
    }
    if (!this.id) {
      this.result = false;
    }
  }

  getRes() {
    return {
      error: true,
      property: [this.idName],
      constraints: {
        id: `${this.idName}값 또는 ${this.idName} 타입이 유효하지 않습니다.`,
      },
    };
  }
}
