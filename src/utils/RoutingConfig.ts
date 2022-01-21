export const routingControllerOptions = {
  cors: true,
  controllers: [`${__dirname}/../controller/**/*.{js,ts}`],
  middlewares: [`${__dirname}/../middlewares/*.{js,ts}`],
  entities: [`${__dirname}/../entity/*.{js,ts}`],
  validation: false,
};
console.log(`${__dirname}/../controller/**/*.ctrl.{js,ts}`);
