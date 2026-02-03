const {protect}=require('../Middleware/AuthMiddleware');
const express=require('express');
const Order = require('../models/Order');

const router=express.Router();

// @route GET /api/orders/my-orders
// @desc get logged-in user's orders
// @access Private

router.get('/my-orders',protect,async(req,res)=>{
    try {
        // Find orders for the authenticated user
        const userId=req.user._id;
        // Sort by most Recent orders
        const userOrders=await Order.find({user:userId}).sort({createdAt:-1});
        return res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

// @route GET /api/orders/:id
// @desc GET order details by ID
// @access private

router.get('/:id',protect,async (req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(!order)return res.status(404).json({message:"Order not found"});
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})

module.exports=router;