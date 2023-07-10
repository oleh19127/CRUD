import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Work } from "./entity/Work";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATA_BASE_HOST,
  port: parseInt(process.env.DATA_BASE_PORT || "5432"),
  username: process.env.DATA_BASE_USER_NAME,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Work],
  subscribers: [],
  migrations: [],
});
