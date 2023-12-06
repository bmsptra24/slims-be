const express = require('express')
const router = express.Router()
import userController from '../controllers/user.controller'

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

export default router
