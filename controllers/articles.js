const Article = require('../models/Article')
const User = require('../models/User')
const {slugify} = require('../utils/stringUtil')
module.exports.createArticle =  async (req,res) => {
    try{
        if(!req.body.article)
            throw new Error('No articles data')
        const data = req.body.article
        if(!data.title) throw new Error('Article title is required')
        if(!data.body) throw new Error('Article body is required')
        if(!data.description) throw new Error('Article description is required')

        //Find out author object
        const user = await User.findByPk(req.user.email)
        if(!user)
            throw new Error("User does not exist")

        console.log("USER **********",user);
        let article = await Article.create({
            slug : slugify(data.title),
            title: data.title,
            description: data.description,
            body: data.body,
            UserEmail: user.email
        })

        if(article){
            delete user.dataValues.password
            delete user.dataValues.email
            article.dataValues.author = user
            res.status(201).json({article})
        }
        res.status(201).json({article})
        
        
    }catch(e){
        return res.status(422).json({
            errors: { body: [ 'Could not create article', e.message ] }
        })
    }
}