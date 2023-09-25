const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require("jsonwebtoken")

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


// generate token
// attendenceSchema.statics.genterateAuthtoken=async function(){
//     try{
//         console.log(this._id)
//         const token=jwt.sign({_id:this._id},"dkjsdmk98jhshduiewewnefhskjfhskd")
//         this.tokens=this.tokens.concat({token})
//        await this.save()
//        return token;

//     }catch(err){
//         // res.send("this is error"+err)
//         console.log('this is error part'+err)
//     }
// }




 const attendence=mongoose.model('register',attendenceSchema)
 
 module.exports=attendence;