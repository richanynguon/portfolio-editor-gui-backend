import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PG_USERNAME, PG_PASSWORD } from "../constants";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-174-129-214-193.compute-1.amazonaws.com',
  port: 5432,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: 'd3js7uorsrmf88',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: true,
  subscribers:[__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
}