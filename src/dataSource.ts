import { env } from 'node:process';
import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";

console.log(env.DATABASE_URL)

export  const dataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  entities: [User],
});
