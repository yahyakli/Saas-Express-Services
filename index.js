import express from "express";
// import productRouter from "./Controllers/ProductController.js";
const app = express();
import  mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// app.use("/product", productRouter)

const startServer = () => {
    try{
        mongoose.set('strictQuery', true);

        mongoose.connect(process.env.MONGOBD_URL)
            .then(() => {
                console.log('mongo db connected')
            })
            .catch((err) => console.log(err))
            app.listen(3000, () => console.log('server started on port 3000'))
    }catch(err){
        console.log(err)
    }
}

startServer();