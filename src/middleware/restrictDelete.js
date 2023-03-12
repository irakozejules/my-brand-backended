import jwt from "jsonwebtoken";
const restrictDelete= (req, res, next)=>{
// Check if the request object has the authorization header
const authHeader= req.headers.authorization;


//GET TOKEN FROM authHeader
const token=authHeader.split(" ")[1]


//CONDITION
if(!authHeader){
    res.status(401).json({
        message:"No token provided"
    })
} else{
    //EXTRACT UNIQUE DATA FROM YOUR TOKEN SO THAT WE CAN USE IT TO VERIFY THAT USER
    const verifyToken= jwt.verify(token, process.env.SECRET_KEY)
    
    if(!verifyToken){
        res.status(401).json({
            message:"Invalid Token"
        })
    }else{
        
        
        const { userId }=verifyToken;

        const {userBodyId}=req.body;
        if(userBodyId !== userId){
            res.status(403).json({
                message:"Access denied"
            })
        }
        else{
            next()
        }
    }



}
}
export default restrictDelete