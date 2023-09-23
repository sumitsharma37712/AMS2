const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
require("dotenv").config();
// const env=require('../env.json')

// const JWT_SECRET=process.env.jwt;
const MONGODB_URL=process.env.MONGODB;
const JWT_SECRET=process.env.JWT;
const Employee = require('../database/models/admin/register_emp')

// user login function
const Employeeverify = async (email,password)=>{
    try {
        const user = await Employee.findOne({email}).lean()
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(await password,user.password)){
            // creating a JWT token
            token = jwt.sign({
                id:user._id,
                email:user.email,
                type:'user'
            },JWT_SECRET,
            { 
                expiresIn: '2h'
            })
            return {status:'ok',data:token}
        }
        // return {status:"ok"} 

        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

const verifyToken = (token)=>{
    try {
        const verify = jwt.verify(token,JWT_SECRET);
        if(verify.type==='user'){return true;}
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}




module.exports=Employeeverify,verifyToken;
