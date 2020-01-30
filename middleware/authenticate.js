const passport =require('passport')
const jwt =require('jsonwebtoken')

// const authenticate =(req, res, next)=>{
//     try{
//         const token=req.headers.authorization
//         console.log('hellooooo')
//         console.log(jwt.verify(token, 'secret'))
//         console.log('hellooooo')
//        jwt.verify(token, 'secret')
//         next()
//     }catch(err){
//         res.json({massage:'authentication faild !' ,status:false})
//     }
// }
module.exports =(req, res, next)=>{
    passport.authenticate('jwt', (err,user,  info )=>{
        if(err){
            return  next(err)
        }
        if(!user){
            return res.status(400).json({
                massage:"autentication faild ", status :false
            })
        }
        next()
         
    })
}