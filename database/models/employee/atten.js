const mongoose = require('mongoose')
const validator = require('validator')

const attendenceSchema = mongoose.Schema({
    empID:{
        type: String,
        required: true,
        trim:true
    },
    
    atten: {
        type: String,
    },
    punchin:{
        type:String,
    },
    punchout:{
        type:String,
        
    },
    date: {
        type: String,
        // default: Date.now
    }
},{ timestamps: true })
const empatten = mongoose.model('empatten', attendenceSchema)

module.exports = empatten;

