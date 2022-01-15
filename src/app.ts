import "reflect-metadata";
import express, { Application } from "express";
import { useContainer as ormContainer, createConnection } from "typeorm";
import bodyParser from "body-parser";
import { Container } from "typedi";
import {
  useContainer as routingContainer,
  useExpressServer,
} from "routing-controllers";
// import { routingControllerOptions } from "./utils/RoutingConfig";
// import { useSwagger } from "./utils/swagger";
import path from "path";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setDatabase();
    this.setMiddlewares();
    this.setEnv();
  }

  // DB 셋팅
  private async setDatabase(): Promise<void> {
    try {
      await createConnection().then(async (connection) => {});
    } catch (error) {
      console.log(error);
    }
  }

  // 미들웨어 셋팅
  private setMiddlewares(): void {
    this.app.use(bodyParser.json({ limit: "20mb" }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  // 환경변수가 지정되어 있다면 지정한 port로 express 서버 개방
  private getHttpPort(): number {
    const portExpression = process.env["HTTP_PORT"];
    if (portExpression) {
      return Number(portExpression);
    }
    return 4000;
  }

  // express 서버 스타트
  public async createExpressServer(): Promise<void> {
    try {
      routingContainer(Container);
      ormContainer(Container);
      // useExpressServer(this.app, routingControllerOptions);
      // useSwagger(this.app);
      const port = this.getHttpPort();

      this.app.listen(port, () => {
        console.log(`Server Start, port: ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // NODE_ENV MODE에 따른 .env 파일 설정
  public async setEnv(): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      require("dotenv").config({
        path: path.join(__dirname, "../.env.development"),
      });
    } else if (process.env.NODE_ENV === "production") {
      require("dotenv").config({
        path: path.join(__dirname, "../.env.production"),
      });
    }
  }
}
