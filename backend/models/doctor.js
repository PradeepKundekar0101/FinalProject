import mongoose from "mongoose";
const DoctorSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    phonenumber:String,
    password:String,
    state:String,
    city:String,
    gender:String,
    age:Number,
    RegNo:Number,
    RegCouncil:String,
    RegYear:Number,
    Degree:String,
    College:String,
    YOC:Number,
    YOE:Number,
    verified:{
        type:Boolean,
        default:false
    },
    profile:String
});
const doctor = mongoose.model("doctor",DoctorSchema);
export default doctor;