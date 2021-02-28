const express = require('express')
const morgan = require('morgan')

const {notFound,errorHandler} = require('./middleware/errorHandler')
const sequelize = require('./dbConnection')
const User = require('./models/User')
const Article = require('./models/Article')

const userRoute = require('./routes/users')

const app = express()

//RELATIONS:
User.hasMany(Article,{
    onDelete: 'CASCADE'
})
Article.belongsTo(User)

const sync = async () => await sequelize.sync({alter:true})
sync()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})

app.use('/api',userRoute)

app.use(notFound)

app.use(errorHandler)

const PORT = 8080

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:8080`);
})