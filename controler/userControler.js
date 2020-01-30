const bcrypt =require('bcryptjs')
const RegisterModel =require('../model/registerModel')
const userValidator=require('../validator/userValidator')
const jwt=require('jsonwebtoken')

const welcome=(req, res)=>{
    res.status(200).json({massage:"Welcome to our Server"})
}

const registerControler=(req, res)=>{
    
    let varify = userValidator.RegisterValidator(req.body)
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			return res.status(400).json({email:"User allready exist ", status :false})
		}else{
			bcrypt.hash(req.body.password, 12,((err, hash)=>{
				if(err){
					console.log(err)
					res.status(500).json({massage:"Server error occurd "})
				}else{
					const newUser= new RegisterModel({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash
                    })
					newUser.save()
					.then(user=>{
						console.log(user)
						res.json({massage:"Register Success "})
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}))
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({massage:"server error occurd "})
	})
}

const loginControler=(req,res)=>{
    let varify =  userValidator.loginValidator({email:req.body.email, password:req.body.password})
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(!user){
		    return	res.status(404).json({massage:"User not found !", status:false});
		}
        bcrypt.compare(req.body.password, user.password)
        .then(result=>{
            if(!result){
                return res.status(400).json({massage:" Wrong password", status:false})
			}
			let payload={name:user.name, email:user.email}
			let token = jwt.sign(payload, "secret" , {expiresIn:'4h'})
            res.status(200).json({massage:"Login successfull !", status:true, userId:user._id , token:token  } )
        })
	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
}
const getMe=(req, res)=>{ 
	RegisterModel.findOne({email:req.user.email})
	.then(user=>{
		if(!user){
			return res.status(400).json({massage:"User not found", status:false})
		}
		return res.status(200).json({name:user.name, email:user.email})

	})
}
const postMe=(req, res)=>{
	const {name,email}=req.body
	const user=req.user
	RegisterModel.findOneAndUpdate({email:user.email})
	.then(user=>{
		if(!user){
			return  res.status(400).json({massage:"User not founded" , status:faild})
		}
		user.name=name
		user.email=email
		user.save()
		.then(success=>{
			return res.status(200).json

		})
	})
}

module.exports={
    welcome,
    registerControler,
	loginControler,
	getMe

}