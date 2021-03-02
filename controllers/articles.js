const Article = require('../models/Article')
const User = require('../models/User')
const Tag = require('../models/Tag')
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
        const slug = slugify(data.title)
        let article = await Article.create({
            slug : slug,
            title: data.title,
            description: data.description,
            body: data.body,
            UserEmail: user.email
        })

        if(data.tagList){
            for(let t of data.tagList){
                let tagExists = await Tag.findByPk(t)
                let newTag
                if(!tagExists){
                    newTag = await Tag.create({name:t})
                    article.addTag(newTag)
                }else{
                    article.addTag(tagExists)
                }
                
            }
        }
        
        article = await Article.findByPk(slug,{include:Tag})
        article = sanitizeOutput(article,user)
        res.status(201).json({article})
        
        
    }catch(e){
        return res.status(422).json({
            errors: { body: [ 'Could not create article', e.message ] }
        })
    }
}

module.exports.getSingleArticleBySlug = async(req,res) => {
    try{
        const {slug} = req.params 
        article = await Article.findByPk(slug,{include:Tag})
        const newTagList = []
        
        for(let t of article.dataValues.Tags){
            newTagList.push(t.name)
        }
        delete article.dataValues.Tags
        article.dataValues.tagList = newTagList
        const user = await article.getUser()
        
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

module.exports.updateArticle = async(req,res) => {
    try{
        if(!req.body.article)
            throw new Error('No articles data')
        const data = req.body.article
        const slugInfo = req.params.slug
        let article = await Article.findByPk(slugInfo,{include:Tag})
        
        if(!article){
            res.status(404)
            throw new Error("Article not found")
        }

        const user = await User.findByPk(req.user.email)

        if(user.email != article.UserEmail){
            res.status(403)
            throw new Error("You must be the author to modify this article")
        }
        
        const title = data.title ? data.title : article.title
        const description = data.description ? data.description : article.description
        const body = data.body ? data.body : article.body
        const slug = data.title ? slugify(title) : slugInfo

        const updatedArticle = await article.update({slug,title,description,body})

        article = sanitizeOutput(updatedArticle,user)
        res.status(200).json({article})
        

    }catch(e){
        const code = req.statusCode ? req.statusCode : 422
        return res.status(code).json({
            errors: { body: [ 'Could not create article', e.message ] }
        })
    }
}

function sanitizeOutput(article,user){
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
        return article
    }
}