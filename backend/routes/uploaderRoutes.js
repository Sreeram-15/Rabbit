const express=require('express');
const multer = require('multer');
const cloudinary=require('cloudinary').v2;
const streamifier=require('streamifier');

require('dotenv').config();

const router=express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});



// Multer setup using memory storage
const storage=multer.memoryStorage();
const upload=multer({storage});


router.post('/',upload.single('image'),async(req,res)=>{
    // console.log({
    //     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    //     api_key:process.env.CLOUDINARY_API_KEY,
    //     api_secret:process.env.CLOUDINARY_API_SECRET,
    // });
    try {
        if(!req.file){
            return res.status(404).json({message:"No File Uploaded"})
        }

        // Function to handle the stream upload cloudinary
        const streamUpload=(filebuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result);
                    }else{
                        reject(error);
                    }
                });
                // Use streamifier to convert file buffer to stream
                streamifier.createReadStream(filebuffer).pipe(stream);

            });
        };

        // Call the stream upload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image url
        return res.json({image_url:result.secure_url});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports=router;
