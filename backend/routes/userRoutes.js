const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect}=require('../Middleware/AuthMiddleware');
const router = express.Router();

// @route POST /api/users/register

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @route authenticate user
// @access public

router.post("/login", async (req, res) => {

  const {email,password}=req.body;

  try {
    let user=await User.findOne({email});

    if(!user)return res.status(400).json({message:"Invalid Credentials"});
    const isMatch=await user.matchPassword(password);

    if(!isMatch)return res.status(400).json({message:"Invalid Credintials"});


    // create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Internal Server Error"});
  }
});

// @router GET/api/users/profile
// @desc Get logged-in user's Profile (Protected Route)
// Acess Private

router.get("/profile",protect,async (req,res)=>{
  res.json(req.user);
})

module.exports = router;
