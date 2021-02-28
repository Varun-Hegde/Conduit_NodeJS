const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('conduit','conduit','conduit',{
    dialect: 'postgres',
    host: 'localhost'
})

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