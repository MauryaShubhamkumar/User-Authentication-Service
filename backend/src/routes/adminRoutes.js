const express = require("express");
 const router = express.Router();
 
 const protect =require("../middleware/authMiddleware");
 const adminOnly= require("../middleware/adminMiddleware");

const { getAllUsers,deleteUser,updateUserRole } = require("../controllers/adminController");

router.get(
    "/users",
    protect,
    adminOnly,
    getAllUsers
);

router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);
router.patch(
    "/users/:id/role",
    protect,
    adminOnly,
    updateUserRole
);

module.exports=router;