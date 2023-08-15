import user from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerUser=async(req,res)=>{
    const {firstname,lastname,email,phonenumber,password,state,city,gender,age} = req.body;
    const {profile} = req.file.filename;
    try
    {
        const hashPass = await bcrypt.hash(password,10);
        const newUser = new user({
            firstname,lastname,email,phonenumber,password:hashPass,state,city,gender,age,profile
        });
        const save = await newUser.save();
        return res.status(201).send({success:true,data:save});
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}
export const loginUser =async(req,res)=>{
    const {email,password} = req.body;
    try
    {
       const userFound = await user.findOne({email});
       if(!userFound) return res.status(404).send({success:false,data:"Invalid details"});
       const matchPass = await bcrypt.compare(password,userFound.password);
       if(matchPass)
       {
            const token = jwt.sign({ userFound },process.env.JWT_SECRET);
            return res.status(200).send({success:true,data:{token,userFound}});
       }
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}