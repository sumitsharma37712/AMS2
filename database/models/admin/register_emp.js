const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')

const attendenceSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    fname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validator(value){
            if(!validator.isEmail({value})){
                throw new Error('email is invalid')
            }
        }
    },
    contact:{
        type:Number,
        require:true,
        trim:true,
        minimum:10,
    },
    password:{
        type:String,
        require:true,
        length:8
    },
    token:{
        type:String,
        require:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})
const attendence=mongoose.model('register',attendenceSchema)





 
 module.exports=attendence;