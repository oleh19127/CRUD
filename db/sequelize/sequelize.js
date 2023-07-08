import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  port: process.env.DATA_BASE_PORT,
  host: process.env.DATA_BASE_HOST,
  dialect: "postgres",
  database: process.env.DATA_BASE_NAME,
  username: process.env.DATA_BASE_USER_NAME,
  password: process.env.DATA_BASE_PASSWORD,
});
