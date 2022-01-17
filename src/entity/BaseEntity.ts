import { convertStringToEntity } from "../utils/convertStringToEntity";

export class BaseEntity {
  getEntity(param: object) {
    const paramKeys = Object.keys(param);
    paramKeys.forEach((key) => {
      this[key] = param[key];
    });
    return this;
  }
}
