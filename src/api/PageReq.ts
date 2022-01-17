import { IsInt, IsOptional } from "class-validator";

export class PageReq {
  @IsOptional()
  @IsInt()
  pageNo: number = 1; // 현재 페이지 넘버

  @IsOptional()
  @IsInt()
  limit: number = 10; // rowPerPage, pageSize

  getOffset(): number {
    return (this.pageNo - 1) * this.limit || 0;
  }

  getLimit(): number {
    return this.limit || 10;
  }
}
