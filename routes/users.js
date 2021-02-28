const { Router } = require('express')
const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {createUser} = require('../controllers/users')

router.post('/users',createUser)




module.exports = router