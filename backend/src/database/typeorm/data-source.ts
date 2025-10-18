import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { registerAs } from '@nestjs/config';
import * as fs from 'fs';

const envPath = path.join(
  process.cwd(),
  'src',
  'configs',
  `.env-${process.env.NODE_ENV || 'dev'}`,
);

dotenv.config({
  path: envPath,
});

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: true,
};

export const typeormConfig = registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config);
