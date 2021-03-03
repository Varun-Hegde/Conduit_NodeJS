const {DataTypes} = require('sequelize')
const sequelize = require('../dbConnection')

const Comment = sequelize.define('Comment',{
    body: {
        type: DataTypes.TEXT,
    }
})

module.exports = Comment