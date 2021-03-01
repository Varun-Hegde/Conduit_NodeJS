const {DataTypes} = require('sequelize')
const sequelize = require('../dbConnection')

const Article = sequelize.define('Article',{
    slug : {
        type: DataTypes.STRING,
        allowNull: false ,
        primaryKey: true  
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    body: { 
      type: DataTypes.TEXT,  
      allowNull: false,
    }
})

module.exports = Article

/* {
  "article": {
    
    
    "tagList": ["dragons", "training"],
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
} */