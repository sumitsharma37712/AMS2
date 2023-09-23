const mongoose=require('mongoose')
const validator=require('validator')

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
        lowercase:true,
        trim:true
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
    date:{
        type:Date,
        default:Date.now
    }
})
 const attendence=mongoose.model('register',attendenceSchema)
 
 module.exports=attendence;