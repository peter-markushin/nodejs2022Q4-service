import { env } from 'node:process';
import { DataSource } from "typeorm";

console.log(env.DATABASE_URL)

export  const dataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  entities: [
    __dirname + '/**/*.entity{.ts,.js}',
  ],
});
