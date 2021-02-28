const { databaseVersion } = require('../dbConnection');
const User = require('../models/User');
const {hashPassword,matchPassword} = require('../utils/password')

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
            
            res.status(201).json({user})
        }    
    }catch (e){
        res.status(422).json({errors: { body: [ 'Could not create user ', e.message ] }})
    }   
}