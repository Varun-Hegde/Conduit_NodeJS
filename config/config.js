require('dotenv').config();

module.exports = {
  development: {
    url: `postgres://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
    dialect: 'postgres',
  },
  test: {
    url: `postgres://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:5432/test`,
    dialect: 'postgres',
  },
};