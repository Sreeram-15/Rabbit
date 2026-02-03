const express=require('express');
const Product=require('../models/Product');
const {protect,admin}=require('../Middleware/AuthMiddleware');

const router=express.Router();

// @ route GET api/admin/products
// @ desc GET all products (Admin only)
// @ access Private/Admin

router.get('/',protect,admin,async(req,res)=>{
    try {
        const product=await Product.find({});
            return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

module.exports=router;