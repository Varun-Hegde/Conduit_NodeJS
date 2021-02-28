const { Router } = require('express')
const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const UserController = require('../controllers/users')
const {authByToken} = require('../middleware/auth')

router.post('/users',UserController.createUser)
router.post('/users/login',UserController.loginUser)
router.get('/user',authByToken,UserController.getUserByEmail)


module.exports = router