
const User= require("../models/User");
const bcrypt = require("bcrypt"); 
const generateToken= require("../utils/generateToken");

const registerUser =async(req, res)=>{
    const {name , email,phoneNumber, password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please provide all fields"
        });
    }
 

    const existingUser =await User.findOne({email});
    //  console.log(existingUser);

    if(existingUser){
        
        return res.status(400).json({
            message:"User already exists"
        });
    }
    const hashedPassword= await bcrypt.hash(password, 10);
    const user= await User.create({
        name,
        email,
        phoneNumber,
        password:hashedPassword,
    });

    res.status(201).json({
        message: "User Register Successfully"
    });
};
const loginUser = async(req,res)=> {
    const {email, password}= req.body;
     if(!email || !password){
        return res.status(400).json({
            message: "Please provide email and password"
        });
     }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User not found"
        });
    }
      
    const isMatch= await bcrypt.compare(
        password, user.password
    );

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const token =generateToken(user._id);
    res.status(200).json({
        message: "Login successful",
        token,
        role:user.role
    }); 
};

const getProfile =async (req,res)=>{
    // console.log("profile cotroller reached");
    console.log(req.user);
    console.log(req.user.id);
    const user= await User.findById(req.user.id).select("-password");

    if (!user) { 
    return res.status(404).json({
        message: "User not found"
    });
}

    res.status(200).json(user);
}; 

 const updateProfile =async (req,res)=> {
  const {name, phoneNumber}= req.body;
  const user= await User.findById(req.user.id);
  if(!user){
    return res.status(404).json({
        message:"User not found"
    });
  } 
  user.name=name|| user.name;
    user.phoneNumber =phoneNumber || user.phoneNumber;
    await user.save();   

    res.status(200).json({
        message:"Profile Updated"
    });
 };


 const changePassword= async(req, res)=>{
  const {currentPassword, newPassword}= req.body;
  if(!currentPassword || !newPassword){
    return res.status(400).json({
        message:"Please provide current password and new password"
    });
}
  const user=await User.findById(req.user.id);
  
  if(!user){
    return res.status(404).json({
        message:"User not found"
    }); 
  }
    
  const isMatch=await bcrypt.compare(
    currentPassword,
    user.password
  ) ;
  if(!isMatch){
    return res.status(401).json({
        message:"Invalid current password"
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword,10);
  user.password = hashedPassword;
  await user.save();  



    res.status(200).json({
        message:"Password changed successfully"
    });
 };


module.exports={
    registerUser,loginUser,getProfile,updateProfile,
    changePassword
};  