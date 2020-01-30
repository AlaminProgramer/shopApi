const passport =require('passport')
const jwt =require('jsonwebtoken')

const authenticate =(req, res, next)=>{
    try {
        let token  =req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token , 'secret')
        req.user=decoded
        next()
    } catch (error) {
        return res.status(400).json({massage:"Authentication faild", status:false})
    }
}
module.exports =authenticate



























// (req, res, next)=>{
//     passport.authenticate('jwt', (err,user,  info )=>{
//         if(err){
//             return  next(err)
//         }
//         if(!user){
//             return res.status(400).json({
//                 massage:"autentication faild ", status :false
//             })
//         }
//         next()
         
//     })(req, res, next)
// }