const express=require('express');
const Order=require('../models/Order');
const {protect,admin}=require('../Middleware/AuthMiddleware');

const router=express.Router();

// @route GET api/admin/order
// @desc GET all Orders (Admin Only) 
// @access private/admin

router.get('/',protect,admin,async(req,res)=>{
    try {
        const orders=await Order.find({}).populate("user","name email");
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error"});
    }
});

// @route PUT api/admin/order/:id
// @desc update order status
// @access private/Admin

router.put('/:id',protect,admin,async (req,res)=>{
    const status=req.body.status;
    try {
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(order){
            if(status){
                order.status=status||order.status;
            }
            if(status==='Delivered'){
                order.isDelivered=true;
                order.deliveredAt=Date.now();
            }
            const updatedOrder=await order.save()
            // await updatedOrder;
            // console.log(await updatedOrder);
            return res.status(200).json(updatedOrder);
        }else{
            return res.status(404).json({message:"Order Not Found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

// @route DELETE api/admin/order/:id
// @desc Delete an Order (Admin Only)
// @access private/admin

router.delete('/:id',protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            return res.status(200).json("Order Removed");
        }else{
            return res.status(404).json({message:"Order Not Found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
})

module.exports=router;