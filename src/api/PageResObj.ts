import { IsString, IsObject } from "class-validator";

export class PageResObj<T> {
  // pageSize: number;
  @IsString()
  msg: string;
  @IsObject()
  item: T;
  error: boolean;

  constructor(item: T, msg: string, error: boolean = false) {
    // this.pageSize = pageSize;
    this.error = error;
    this.msg = msg;
    this.item = item;
    this.checkEmptyItem();
  }

  updateMsg(msg: string) {
    this.msg = msg;
  }

  checkEmptyItem() {
    if (!this.item) {
      this.msg = "데이터가 존재하지 않습니다.";
      this.error = true;
    }
  }
}
