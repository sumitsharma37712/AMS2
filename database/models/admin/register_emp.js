const mongoose=require('mongoose')
const validator=require('validator')

const attendenceSchema=mongoose.Schema({
    
    empID:{
        type:String,
        trim:true,
        required:true
    },
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
    address:{
        type:String,
        require:true,
        trim:true,
    },
    salary:{
        type:Number,
        require:true,
        trim:true,
    },
    filename:{
        type:String,
    },
    password:{
        type:String,
        require:true,
        length:8
    },
},{ timestamps: true })
const attendence=mongoose.model('register',attendenceSchema) 
 module.exports=attendence;