import { env } from 'node:process';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});
