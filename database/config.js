const mongoose=require('mongoose')
require('dotenv').config()
// url = 'mongodb+srv://sumitsharma37712:2996249Sumit@cluster0.y2fon8c.mongodb.net/AMS?retryWrites=true&w=majority&appName=AtlasApp'
const MONGODB=process.env.MONGDB||'mongodb://localhost:27017/AMS'
mongoose.connect(MONGODB,{ useNewUrlParser: true }, { useUndefinedTopology: true }).then(() => {
    console.log('successful connect')
}).catch((err) => { console.log(err) });