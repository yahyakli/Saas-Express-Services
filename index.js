import express from "express";
const app = express();
import  mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from './routes/projectRoutes.js';
import projectMemberRoutes from "./routes/projectMemberRoutes.js";
dotenv.config();


app.use(express.json());

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/projects', projectMemberRoutes);


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