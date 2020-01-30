const express=require('express')
const userRouter = express()
const userControler= require('../controler/userControler')
const authenticate =require('../middleware/authenticate')



userRouter.get('/welcome', userControler.welcome)
userRouter.post('/auth/register', userControler.registerControler)
userRouter.post('/auth/login',userControler.loginControler)
userRouter.get('/auth/me',authenticate, userControler.getMe)












 module.exports= userRouter