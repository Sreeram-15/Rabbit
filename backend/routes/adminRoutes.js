const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../Middleware/AuthMiddleware");

const router = express.Router();

// @route GET api/admin/users
// @desc get all users (for admin only)
// @access private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const allUsers = await User.find({}).select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST api/admin/users
// @desc Add a new user (admin only)
// @access private/Admin

router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "User already exists" });

    user = new User({
      name,
      email,
      password,
      role:role||"customer",
    });
    await user.save();
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT api/admin/users/:id
// @desc update user info (admin only) -Name, email and role
// @access private/Admin

router.put('/:id',protect,admin,async(req,res)=>{
    try {
        const {name,email,role}=req.body;
        const user=await User.findById(req.params.id).select("-password");

        if(user){
            user.name=name??user.name;
            user.email=email??user.email;
            user.role=role??user.role;
            await user.save();
            return res.status(200).json({user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }});
        }else{
            return res.status(404).json({message:"Something went wrong"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

// @route DELETE api/admin/users/:id
// @desc update user info (admin only) -Name, email and role
// @access private/Admin

router.delete('/:id',protect,admin,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);

        if(user){
            await user.deleteOne();
            return res.status(200).json({message:"User Deleted Successfully"});
        }else{
            return res.status(404).json({message:"User not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

module.exports = router;
