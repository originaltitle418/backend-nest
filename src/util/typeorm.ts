import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_DATABASE,
  entities: [__dirname + '/../entity/*.entity.{ts,js}'],
  synchronize: true,
  logging: true,
};
