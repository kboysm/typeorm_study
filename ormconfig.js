const rootPath = process.env.NODE_ENV === "production" ? "dist" : "src";
module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "test",
  synchronize: false, // 데이터 베이스 동기화 옵션
  connectTimeout: 3000,
  logging: true, // 데이터베이스 로그를 터미널에 출력
  timezone: "Z",
  entities: [`${rootPath}/entity/**/*.{js,ts}`],
  migrations: [`${rootPath}/migration/**/*.{js,ts}`],
  subscribers: [`${rootPath}/subscriber/**/*.{js,ts}`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
