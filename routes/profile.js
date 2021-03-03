const express = require('express');
const router = express.Router();
const ProfileRouter = require('../controllers/profile')

const {authByToken} = require('../middleware/auth')

router.get('/:username',authByToken,ProfileRouter.getFollowers)
router.post('/:username/follow',authByToken,ProfileRouter.follow)
router.delete('/:username/follow',authByToken,ProfileRouter.unfollow)

module.exports = router