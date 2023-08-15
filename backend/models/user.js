import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:
    {
        type:String,
        unique:true,
    },
    phonenumber:String,
    password:String,
    state:String,
    city:String,
    gender:String,
    age:Number
});

const user = mongoose.model("user",UserSchema);
export default user;