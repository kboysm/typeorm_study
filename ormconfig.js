const rootPath = process.env.NODE_ENV === "production" ? "dist" : "src";
module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  synchronize: true, // 데이터 베이스 동기화 옵션
  connectTimeout: 3000,
  logging: false, // 데이터베이스 로그를 터미널에 출력
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
