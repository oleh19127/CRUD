import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Work } from "./entity/Work";

const port = process.env.DATA_BASE_PORT
  ? parseInt(process.env.DATA_BASE_PORT)
  : undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATA_BASE_HOST,
  port: port,
  username: process.env.DATA_BASE_USER_NAME,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Work],
  subscribers: [],
  migrations: [],
});
