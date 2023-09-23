const mongoose=require('mongoose')
const validator=require('validator')

const attendenceSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    date:{
        type:Date,
        require:true,
    },
    present:{
        type:String,
        require:true,
        minimum:1
    },
    absent:{
        type:String,
        minimum:1
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const empatten=mongoose.model('empatten',attendenceSchema)

module.exports=empatten;