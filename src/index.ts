import { App } from "./app";
try {
  const app = new App();
  app.createExpressServer();
} catch (err) {
  console.log(err);
}
