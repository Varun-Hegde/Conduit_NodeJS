const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").default;

const Comment = sequelize.define("Comment", {
  body: {
    type: DataTypes.TEXT,
  },
});

module.exports = Comment;
