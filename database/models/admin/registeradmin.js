const mongoose=require('mongoose')
const validator=require('validator')

const adminregisterSchema=mongoose.Schema({
    adminname:{
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
        lowercase:true,
        trim:true,
        validator(value){
            if(!validator.isEmail({value})){
                throw new Error('email is invalid')
            }
        }
    },
    contact:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
        length:8
    },
    date:{
        type:Date,
        default:Date.now
    }
})
 const adminregister=mongoose.model('adminregister',adminregisterSchema)
 
 module.exports=adminregister;