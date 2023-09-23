const express=require('express')
const serverless=require('serverless-http')
const app=new express()
const conn=require('./database/config')
require('dotenv').config()

const PORT=process.env.PORT || 4001;
const host="localhost"
const router=require('./routers/route')
const employee=require('./database/models/admin/register_emp')
const Employeeatten=require('./database/models/employee/atten')





const cors=require('cors')
app.use(express.json())
app.use(router)
app.use(cors())


app.listen(PORT,()=>{
    console.log(`server port start ${PORT}`)
})

// app.use('./netlify/functions/api',router)
// module.exports.handler=serverless(app)