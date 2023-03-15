import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginController = async(req, res)=>{

    const {email, password}= req.body
    try {

        const user= await User.findOne({email})
        console.log(user)
        if(!user){
            res.status(400).json({
                message:"invalid email"
            })
        }else{
            //Check password
            const checkPassword= await bcrypt.compare(password, user.password) 
            console.log(checkPassword)

            if(!checkPassword){
                return res.status(400).json({
                    message:"Invalid Cridential"
                })

            }else{
                const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY)
                console.log(token)
                return res.status(200).json({
                    
                    message: "Correct cridential",
                    data: user,
                    token:token
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
    

}
export default loginController