const mongoose=require('mongoose')
const validator=require('validator')

const adminregisterSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
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