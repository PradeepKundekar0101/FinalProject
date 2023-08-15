import doctor from '../models/doctor.js'
export const registerDoctor = async (req,res)=>{
    const {firstname,lastname,email,phonenumber,password,state,city,gender,age,RegNo,RegCouncil,RegYear,Degree,College,YOC,YOE } = req.body;
    const {profile} = req.file.filename;
    try
    {
        const hashPass = await bcrypt.hash(password,10);
        const newDoctor = new doctor({
            firstname,lastname,email,phonenumber,password:hashPass,state,city,gender,age,RegNo,RegCouncil,RegYear,Degree,College,YOC,YOE,profile
        });
        const save = await newDoctor.save();
        return res.status(201).send({success:true,data:save});
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}
export const loginDoctor =async(req,res)=>{
    const {email,password} = req.body;
    try
    {
       const docFound = await user.findOne({email});
       if(!docFound) return res.status(404).send({success:false,data:"Invalid details"});
       const matchPass = await bcrypt.compare(password,docFound.password);
       if(matchPass)
       {
            const token = jwt.sign({ docFound },process.env.JWT_SECRET);
            return res.status(200).send({success:true,data:{token,docFound}});
       }
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}