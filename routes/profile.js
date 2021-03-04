const express = require('express');
const router = express.Router();
const ProfileRouter = require('../controllers/profile')

const {authByToken} = require('../middleware/auth')

router.get('/:username',authByToken,ProfileRouter.getFollowers)         //Get a profile of a user of the system
router.post('/:username/follow',authByToken,ProfileRouter.follow)       //Follow a user by username
router.delete('/:username/follow',authByToken,ProfileRouter.unfollow)   //Unfollow a user by username

module.exports = router