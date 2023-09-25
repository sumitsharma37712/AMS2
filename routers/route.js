const express = require('express')
const router = new express.Router();
const session = require('express-session')
require('dotenv').config();

const Employee = require('../database/models/admin/register_emp')
const adminregister=require('../database/models/admin/registeradmin')
const Employeeatten = require('../database/models/employee/atten')
const {Employeeverify,verifyToken,verifyadminToken}=require('../verifyjs/empv');
const bcrypt=require('bcryptjs')
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser'); // Middleware
const jwt=require("jsonwebtoken")
const cookie = require('cookie-parser')
const salt=10;

router.use(bodyParser.urlencoded({ extended: false }));

router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))




router.get('/', (req, res) => {
    console.log('demo page')
    res.send("<h1> hii</h1>")

})
router.post('/register', async (req, res) => {
    console.log('demo page')
    // res.send('api process integer')
    const{ name,fname,email,contact,password:plainTextPassword }=req.body

    const password = await bcrypt.hash(plainTextPassword,salt);

    // const data={
        // name:name,
        // fname:fname,
        // email:email,
        // contact:contact,
        // password: password,
    // }
    try {
        const check=await Employee.findOne({email:email})
        // const check1=await Employee.findOne({password:password})
        if (check) {
            console.log('user exist')
            res.send('user alredy registered')
        } else {
            // let user = new Employee(req.body)
            // const result = await user.save()
            const response = await Employee.create({
                name,fname,email,contact,password
            })
            res.send(response)
            console.log(`${name }, Registration Successfull`)
            // return res.redirect('/');
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/adminlogin', (req, res) => {
    try {
       const email=req.body.email;
       const password=req.body.password;
       const data={email,password}
       const admin={email:"admin312@gmail.com",password:"boolean212"};
        if (admin) {
            // console.log('ewsa')
                token = jwt.sign({
                    email:email,
                    type:'admin'
                },"thisisaadminloginpasswordforconfirtjone",
                { 
                    expiresIn: '2 hours'
                })
                console.log(token)
                res.cookie('token',token,{ maxAge: 1000 * 60 * 60 * 24, httpOnly: true });  // maxAge: 2 hours

                // return {status:'ok',token}
                res.send(`hello ${email}, welcome to our dashboard`)
            // console.log('admin login')
            // const token='dsndmsdjksds33oi3oi332'
            // res.send({data:token})
            // r('./admin')
        } else {
            console.log('Your password  and email has been worng.')
            res.send('Your password  and email has been worng.')
        }
    } catch (e) {
        // console.log(error);
        console.log(e)
        return {status:'error',error:'timed out'}
    }
})


router.post('/emplogin', async (req, res) => {
    const{email,password}=req.body
    const response= await Employeeverify(email,password)
    console.log(response)
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        // const token = createToken(user._id);
        res.cookie('token',token,{ maxAge: 1000 * 60 * 60 * 24, httpOnly: true });  // maxAge: 2 hours
        // res.redirect('/');
        res.send(`hello ${email}, welcome to our dashboard`)
    }else{
        res.json(response);
    }

    // const password1=bcrypt.compare(password,req.body.password)
    // console.log(password1)
    // if (req.body.email && password1) {
    //     let user = await Employee.findOne(req.body).select("-password")
    //     if (user) {
    //         // req.session.user=req.body.email
    //         // console.log(req.session.user)
    //         res.send(user)
    //     } else {
    //         res.send('Employee not found')
    //         console.log(password)
    //     }
    // } else {
    //     res.send('no Employee found')
    // }
})

router.get('/empdashboard',(req,res)=>{
    const {token}=req.cookies;
    if(verifyToken(token)){
        // return res.render('home');
        console.log('token generate true')
    }else{
        // res.redirect('/lo')
        console.log('token generate false')

    }
})
router.get('/admindashboard',(req,res)=>{
    const {token}=req.cookies;
    if(verifyadminToken(token)){
        // return res.render('home');
        console.log('token generate true')
    }else{
        // res.redirect('/lo')
        console.log('token generate false')

    }
})




router.get('/admin', (req, res) => {
    res.send('welcome back', data)
})


router.get("/allemp", async (req, res) => {
    try {
        let user = await Employee.find({})
        // res.send({ status: 'ok', data: user })
        res.send(user)
        // console.log(user)
    }
    catch (err) {
        console.log(err)
    }

})


// router.get('/empatten',()=>{


// })





module.exports = router;


// app.use('./netlify/functions/api',router)
// module.exports.handler=serverless(app)



//    i express dotenv nodemon body-parser serverless-http cors bcryptjs jsonwebtoken validator cookie-parser express-session