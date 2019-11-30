import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PG_USERNAME, PG_PASSWORD } from "../constants";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: 'portfolio',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  // dropSchema: true,
  subscribers:[__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
}