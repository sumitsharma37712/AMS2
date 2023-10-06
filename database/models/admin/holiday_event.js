const mongoose=require('mongoose')
const validator=require('validator')

const holidaySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    date:{
        type:String,
    },
},{ timestamps: true })
const holiday=mongoose.model('register',holidaySchema) 
 module.exports=holiday;