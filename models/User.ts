import { Model, Optional } from "sequelize/types";
import { DataTypes } from "sequelize";
import sequelize from "../dbConnection";

export type UserAttributes = {
  id: number;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
};

type CreateUserAttributes = Optional<UserAttributes, "id">;

type UserModel = Model<UserAttributes, CreateUserAttributes>;

const User = sequelize.define<UserModel, CreateUserAttributes>(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;

/* {
  "user": {
    "token": "jwt.token.here",
  }
} */
