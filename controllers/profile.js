const User = require('../models/User')

module.exports.follow = async (req,res) => {
    try{
        const name = req.params.username
        const userToFollow = await User.findOne({
            where:{
                username : name
            }
        })
        
        if(!userToFollow){
            res.status(404)
            throw new Error('User with this username not found')
        }
      
        const user = await User.findByPk(req.user.email)

        await userToFollow.addFollowers(user)
        const profile = {
            username: name,
            bio: userToFollow.dataValues.bio,
            image: userToFollow.dataValues.image,
            following: true
        }
        res.status(200).json({profile})
        
    }catch(e){
        const code = res.statusCode ? res.statusCode : 422
        return res.status(code).json({
            errors: { body: [e.message ] }
        })
    }
    
}

module.exports.unfollow = async (req,res) => {
    try{
        const name = req.params.username
        const userToFollow = await User.findOne({
            where:{
                username : name
            }
        })
        
        if(!userToFollow){
            res.status(404)
            throw new Error('User with this username not found')
        }
      
        const user = await User.findByPk(req.user.email)

        await userToFollow.removeFollowers(user)
        const profile = {
            username: name,
            bio: userToFollow.dataValues.bio,
            image: userToFollow.dataValues.image,
            following: false
        }
        res.status(200).json({profile})
        
    }catch(e){
        const code = res.statusCode ? res.statusCode : 422
        return res.status(code).json({
            errors: { body: [e.message ] }
        })
    }
}

module.exports.getFollowers = async (req,res) => {
    try{
        const name = req.params.username
        const userToFollow = await User.findOne({
            where:{
                username : name
            },
            include: ['followers']
        })
        
        if(!userToFollow){
            res.status(404)
            throw new Error('User with this username not found')
        }
        
        let followingUser = false
        if(req.user){
            for(let t of userToFollow.followers){
                if(t.dataValues.email === req.user.email){
                    followingUser = true;
                    break;
                }
            }
        }
        
        
        const profile = {
            username: name,
            bio: userToFollow.dataValues.bio,
            image: userToFollow.dataValues.image,
            following: followingUser
        }
        res.status(200).json({profile})
        
    }catch(e){
        const code = res.statusCode ? res.statusCode : 422
        return res.status(code).json({
            errors: { body: [e.message ] }
        })
    }
}