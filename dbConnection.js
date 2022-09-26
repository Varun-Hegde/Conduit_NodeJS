const { Sequelize } = require("sequelize");

//LOCAL CONNECTION

/* const sequelize = new Sequelize('conduit','root','password',{

    dialect: 'mysql',

    host:'localhost',

    logging: false

}); */

//AMAZON RDS CONNECTION

/* const sequelize = new Sequelize('conduit1',process.env.USER_NAME,process.env.PASSWORD,{

    dialect: 'mysql',

    host:process.env.DB_HOST,

    logging: false,

    port: 3306

});

 */

const sequelize = new Sequelize("sqlite::memory:");

const checkConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

module.exports = sequelize;
