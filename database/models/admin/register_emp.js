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


// attendenceSchema.pre('save',function (next){
//     const emp=this
    

// })
// attendenceSchema.statics.findByCredencial=async(email,password)=>{
//     const user=await attendence.findOne({email})
//     if(!user){
//         throw new Error('unable to login')
//     }
//     const isMatch=await bcrypt.compare(password, user.password)

//     if(!isMatch){
//         throw new Error('password not match unable login')
//     }
//     return user


// }






// // generate token
// attendenceSchema.model.genterateAuthtoken=async function(){
//     try{
//         console.log(this._id)
//         const token=jwt.sign({_id:this._id},"thisisaemployeetoken")
//         this.tokens=this.tokens.concat({token})
//        await this.save()
//        return token;

//     }catch(err){
//         // res.send("this is error"+err)
//         console.log('this is error part'+err)
//     }
// }




 
 module.exports=attendence;