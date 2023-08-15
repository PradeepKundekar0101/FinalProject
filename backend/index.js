import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

import { registerUser } from './controllers/authUser.js'
import userRouter from './routes/userRoutes.js'
dotenv.config();
const PORT = process.env.PORT || 6001;
const app = express();



app.use(express.json());
app.use(cors());

/* Connection to DataBase */
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running at Port "+PORT);
    })
}).catch((e)=>{
    console.log(e.message)
});

/*Configure Multer */
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,"/public/assets");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({storage});

/* Routes Accepting Images */
app.post("/user/register",upload.single("profile"),registerUser);

/*Routes */
app.use("/user",userRouter);


