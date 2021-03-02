const express = require('express')
const morgan = require('morgan')

const {notFound,errorHandler} = require('./middleware/errorHandler')
const sequelize = require('./dbConnection')

const User = require('./models/User')
const Article = require('./models/Article')
const Tag = require('./models/Tag')
//const TagList = require('./models/TagList')

const userRoute = require('./routes/users')
const articleRoute = require('./routes/articles')

const app = express()

//RELATIONS:
//1 to many relation between user and article
User.hasMany(Article,{
    onDelete: 'CASCADE'
})
Article.belongsTo(User)

//many to many relation between article and taglist
Article.belongsToMany(Tag,{through: 'TagList',uniqueKey:false,timestamps:false})
Tag.belongsToMany(Article,{through: 'TagList',uniqueKey:false,timestamps:false})


const sync = async () => await sequelize.sync({alter:true})
sync()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})
app.use('/api',userRoute)
app.use('/api/articles',articleRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = 8080

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:8080`);
})