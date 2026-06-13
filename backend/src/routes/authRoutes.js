const express =require("express");
const protect= require("../middleware/authMiddleware");
const router =express.Router();
 const {registerUser,loginUser,getProfile,updateProfile,changePassword}= require("../controllers/authController");
 
 router.post("/register",registerUser);
 router.post("/login",loginUser);
 router.get("/profile",protect,getProfile);
 router.put("/profile", protect, updateProfile);
 router.put("/change-password", protect, changePassword);

 module.exports = router;    