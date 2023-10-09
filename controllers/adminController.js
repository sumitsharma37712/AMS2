const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const adminregister=require('../database/models/admin/registeradmin')
const salt =10
const jwt=require('jsonwebtoken')



const adminLog=asyncHandler(async(req,res)=>{
    const email = req.body.email;
  const password = req.body.password;
  try {
    if (email == "" && password == "") {
      console.log("enter email and password");
      return res.json({ error: "enter email and password" });
    } else if (email == "admin312@gmail.com" && password == "boolean212") {
      req.session.email = email;
      console.log(req.session.email);
      token = jwt.sign(
        {
          email: email,
          type: "admin",
        },
        "Booleanai$23@as$%",
        {
          expiresIn: "324 seconds",
        }
      );
      console.log("Login admin");
      if (!token) {
        return res.json({ token: "token not generate" });
      } else {
        res.status(200).json({ token: token },);
        req.session.email = email;
      }
    } else {
      console.log({ err: "Your password  and email has been worng." });
      return res
        .status(401)
        .send({ error: "Your password  and email has been worng." });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
})
const adminRegister=asyncHandler(async(req,res)=>{
    const { admin_name, fname, email, contact, address, password: plainTextPassword, } = req.body;
  const password = await bcrypt.hash(plainTextPassword, salt);
  try {
    const check = await adminregister.findOne({ email: email });
    if (check) { 
      console.log("admin exist");
      res.send("admin alredy registered");
    } else {
      const response = await adminregister.create({
        admin_name, fname, email, contact, address, password,
        // filename:req.file.filename
      });
      res.send(response);
      console.log(`${admin_name}, Registration Successfull`);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }

})
const adminAuth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await adminregister.findOne({email})
    if(!user){
        return res.status(404).send()
      }
    try{
      if(await bcrypt.compare(await password, user.password)){(
        tdata = {
          id:user._id,
          email:user.email,       
          type: "admin",
        }),{ expiresIn: "10 minutes" };
        const token = jwt.sign(tdata, "erueoilfu34w894wedskndskf");
        // console.log(token)
        req.session.email=email
        const data=res.json({
            id:user._id,
            email:user.email,
            admin_name:user.admin_name,
            contact:user.contact,
            address:user.address,
            token:token,
            
        })
        // console.log(data)

        // return res.send({data:user,token:token},req.session.email,console.log(req.session.email))  
      }else{
        // res.status(400).send({status:error})
      }
    }catch(e){
      return res.send({e:"error"})
    }

})













module.exports={adminRegister,adminAuth,adminLog}
