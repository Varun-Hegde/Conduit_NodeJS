const express = require('express')
const router = express.Router()

const {authByToken} = require('../middleware/auth')

const ArticleController = require('../controllers/articles')

//router.get('/',ArticleController)            //Get most recent articles from users you follow
//router.get('/feed',authByToken,ArticleController)       //Get most recent articles globally
router.post('/',authByToken,ArticleController.createArticle)          //Create an article
router.get('/:slug',ArticleController.getSingleArticleBySlug)      //Get an article
router.patch('/:slug',authByToken,ArticleController.updateArticle)      //Update an article 
//router.delete('/:slug',authByToken,ArticleController)   //Delete an article

module.exports = router