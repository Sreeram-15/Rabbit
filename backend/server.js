const express=require('express');
const cors=require('cors');
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const checkoutRoutes=require('./routes/checkoutRoutes');
const orderRoutes=require('./routes/orderRoutes');
const uploadRoutes=require('./routes/uploaderRoutes');
const subscriberRoutes=require('./routes/subscriberRoutes');
const adminRoutes=require('./routes/adminRoutes');
const productAdminRoutes=require('./routes/productAdminRoutes');
const adminOrderRoutes=require('./routes/adminOrderRoutes');
const app=express();


app.use(express.json());
app.use(cors());

dotenv.config();

// console.log(process.env.PORT);

const PORT=process.env.PORT||3000;

// Connect to MongoDB
connectDB();

// api routes
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/checkout',checkoutRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/subscribe',subscriberRoutes);

// admin routes
app.use('/api/admin/users',adminRoutes);
app.use('/api/admin/products',productAdminRoutes);
app.use('/api/admin/orders',adminOrderRoutes);

app.get('/',(req,res)=>{
    res.send("Welcome to Rabbit API!");
});

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
