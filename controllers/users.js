const { databaseVersion } = require('../dbConnection');
const User = require('../models/User');
const {hashPassword,matchPassword} = require('../utils/password')
const {sign,decode} = require('../utils/jwt')


module.exports.createUser = async (req,res) => {
    try{
        if(!req.body.user.username) throw new Error("Username is Required")
        if(!req.body.user.email) throw new Error("Email is Required")
        if(!req.body.user.password) throw new Error("Password is Required")
        
        const existingUser = await User.findByPk(req.body.user.email)
        if(existingUser)
            throw new Error('User aldready exists with this email id')

        const password = await hashPassword(req.body.user.password);
        const user = await User.create({
            username: req.body.user.username,
            password: password,
            email: req.body.user.email
        })
        
        if(user){
            if(user.dataValues.password)
                delete user.dataValues.password
            user.dataValues.token = await sign(user)
            user.dataValues.bio = null
            user.dataValues.image = null
            res.status(201).json({user})
        }    
    }catch (e){
        res.status(422).json({errors: { body: [ 'Could not create user ', e.message ] }})
    }   
}

module.exports.loginUser = async (req,res) => {
    try{
        if(!req.body.user.email) throw new Error('Email is Required')
        if(!req.body.user.password) throw new Error('Password is Required')

        const user = await User.findByPk(req.body.user.email)

        if(!user){
            res.status(401)
            throw new Error('No User with this email id')
        }
        
        //Check if password matches
        const passwordMatch = await matchPassword(user.password,req.body.user.password)

        if(!passwordMatch){
            res.status(401)
            throw new Error('Invalid password or email id')
        }
            
        delete user.dataValues.password
        user.dataValues.token = await sign({email: user.dataValues.email,username:user.dataValues.password})

        res.status(200).json({user})
    }catch(e){
        const status = res.statusCode ? res.statusCode : 500
        res.status(status).json({errors: { body: [ 'Could not create user ', e.message ] }})
    }
}