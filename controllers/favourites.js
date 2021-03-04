const User = require('../models/User')
const Article = require('../models/Article')
const Tag = require('../models/Tag')

function sanitizeOutput(article,user,count){
    const newTagList = []
    for(let t of article.dataValues.Tags){
        newTagList.push(t.name)
    }
    delete article.dataValues.Tags
    article.dataValues.tagList = newTagList
        
    if(article){
        delete user.dataValues.password
        delete user.dataValues.email
        article.dataValues.author = user
        article.dataValues.favorited = true
        article.dataValues.favoritedCount = count
        return article
    }
}

module.exports.addFavourite = async (req,res) => {
    try{
        let article = await Article.findByPk(req.params.slug,{include:Tag})
        if(!article){
            res.status(404)
            throw new Error('Article not found')
        }
        await article.addUsers(req.user.email)
        const user = await article.getUser()
        const count = await article.countUsers()
        article = sanitizeOutput(article,user,count)
        res.json(article)
    }catch(e){
        const code = res.statusCode ? res.statusCode : 422
        return res.status(code).json({
            errors: { body: [  e.message ] }
        })
    }
}

module.exports.removeFavourite = async (req,res) => {
    try{
        let article = await Article.findByPk(req.params.slug,{include:Tag})
        if(!article){
            res.status(404)
            throw new Error('Article not found')
        }
        await article.removeUsers(req.user.email)
        const user = await article.getUser()
        const count = await article.countUsers()
        article = sanitizeOutput(article,user,count)
        res.json(article)
    }catch(e){
        const code = res.statusCode ? res.statusCode : 422
        return res.status(code).json({
            errors: { body: [  e.message ] }
        })
    }
}