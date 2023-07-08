import { sequelize } from "../sequelize/sequelize.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

export const Work = sequelize.define("work", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING },
});

User.hasMany(Work);
Work.belongsTo(User);
