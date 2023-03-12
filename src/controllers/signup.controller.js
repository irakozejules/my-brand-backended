import user from "../model/user.js"
import bcrypt from "bcrypt"

const signupController = async(req, res)=>{
const {fullname, email, password}= req.body

try {
    // hash the password
    const hashedPassword= await bcrypt.hash(password, 10)

    //create new user
    const newUser = await user.create({fullname, email, password: hashedPassword})

    res.status(201).json({
        message: "New user was created",
    
    })
} catch (error) {
    res.status(500).json({
        message:"Server Error"
    });
}
}


export default signupController