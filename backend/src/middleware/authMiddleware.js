const jwt =require("jsonwebtoken");
const User=require("../models/User");
const protect = async(req, res, next) => {
// console.log("Middleware reached");
 const authHeader=req.headers.authorization;
 if(!authHeader){
    return res.status(401).json({
        message:"No token provided"
    });
 }
 try{
    const token=authHeader.split(" ")[1]; 
 const decoded =jwt.verify(
    token,
    process.env.JWT_SECRET
 );
//  console.log(decoded);
const user = await User.findById(decoded.id).select("-password");
req.user=user;
if(!user){
    return res.status(404).json({
        message:"User not found"
    });
}
 next();
 } 
 catch(error){
    return res.status(401).json({
        message:"Invalid token"
    });
 }
};
module.exports = protect; 