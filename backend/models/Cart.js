const mongoose = require("mongoose");
const User = require("./User");
const Product=require('./Product');

const cartItemSchema=mongoose.Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Product,
            required:true,
        },
        name:String,
        image: String,
        price: String,
        size:  String,
        color: String,
        quantity:{
            type:Number,
            default:1,
        }
    },{
        _id:false,
    }
);

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId:{
        type:String,
    },
    products:{
        type:[cartItemSchema],
        required:true,
    },
    totalPrice:{
        type:Number,
    },
},{
    timestamps:true
});

module.exports=mongoose.model('Cart',cartSchema);