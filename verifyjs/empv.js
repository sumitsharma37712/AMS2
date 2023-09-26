const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
require("dotenv").config();
// const env=require('../env.json')

// const JWT_SECRET=process.env.jwt;
// const MONGODB_URL=process.env.MONGODB;
const JWT_SECRET=process.env.JWT;
const Employee = require('../database/models/admin/register_emp')

// user login function

// const AdminVerify=async(email,password)=>{
//     try{
//         const admin=await (email,password);
//         if(!admin){
//             return {status:'error',error:'user not found'}
//         }

//     }catch (error) {
//         console.log(error);
//         return {status:'error',error:'timed out'}
//     }
// }


const Employeeverify = async (email,password)=>{
    try {
        const user = await Employee.findOne({email:email})
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(await password,user.password)){
            // creating a JWT token
            tdata={
                id:user._id,
                email:user.email,
                type:'user'
            },{ expiresIn:'10 min'}
            const token = jwt.sign(tdata,JWT_SECRET)
            console.log(token)
            // return {status:'ok',data:token}
            const verify = jwt.verify(token,JWT_SECRET);
            console.log(verify)
        }
        // return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

// const verifyToken = (token)=>{
//     try {
//         const verify = jwt.verify(token,JWT_SECRET);
//         if(verify.type==='user'){return true;}
//         else{return false};
//     } catch (error) {
//         console.log(JSON.stringify(error),"error");
//         return false;
//     }
// }
// verifyToken()

const verifyadminToken = (token)=>{
    try {
        const verify = jwt.verify(token,"Booleanai$23@as$%");
        if(verify.type==='admin'){return true;}
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}
// verifyadminToken()

module.exports=Employeeverify,verifyadminToken;
