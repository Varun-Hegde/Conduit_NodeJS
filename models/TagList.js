const {DataTypes} = require('sequelize')
const sequelize = require('../dbConnection')

const TagList = sequelize.define('TagList',{
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Tags',
            key: 'tag'
        }
    },
    articlename: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Articles',
            key: 'slug'
        }
    }
},{
    timestamps: false
})

module.exports = TagList