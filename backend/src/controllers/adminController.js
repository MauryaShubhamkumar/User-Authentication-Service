const User = require("../models/User");

const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json({
        users
    });
};
const deleteUser = async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "User deleted successfully"
    });
};

const updateUserRole = async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.role = req.body.role;

    await user.save();

    res.status(200).json({
        message: "Role updated successfully"
    });
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUserRole
};