const {Sequelize} = require('sequelize')

//LOCAL CONNECTION
/* const sequelize = new Sequelize('conduit','root','password',{
    dialect: 'mysql',
    host:'localhost',
    logging: false
}); */

//AMAZON RDS CONNECTION
const sequelize = new Sequelize('conduit1','varun','password',{
    dialect: 'mysql',
    host:'conduit.cmcgkcqi7e2m.us-east-2.rds.amazonaws.com',
    logging: false,
    port: 3306
});

const checkConnection =async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConnection()

module.exports = sequelize