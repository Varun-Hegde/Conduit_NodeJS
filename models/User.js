const {DataTypes} = require('sequelize')
const sequelize = require('../dbConnection')

const User = sequelize.define('User',{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})


module.exports = User

/* {
  "user": {
    "token": "jwt.token.here",
  }
} */