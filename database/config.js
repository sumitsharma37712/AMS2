const mongoose=require('mongoose')
// const validator=require('validator')
// mongoose.connect('mongodb://127.0.0.1:27017/AMS',{ useNewUrlParser: true }, { useUndefinedTopology: true }).then(() => {
//     console.log('successful connect')
// }).catch((err) => { console.log(err) });


require('dotenv').config()
// const mongoose =require('mongoose')
const {MONGODB_URL}=process.env

exports.connect=()=>{
    console.log(typeof MONGODB_URL)
    mongoose.connect(MONGODB_URL,{ useNewUrlParser: true},{ useUndefinedTopology: true })
    .then(
        
            console.log('db connect successful')
        
    )
    .catch((err)=>{
        console.log("error DB failed ")
        console.log(err)
        process.exit(1)
    })
}