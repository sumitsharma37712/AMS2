const express = require('express')
const router = new express.Router();
const session = require('express-session')
require('dotenv').config();

const Employee = require('../database/models/admin/register_emp')
const adminregister = require('../database/models/admin/registeradmin')
const Employeeatten = require('../database/models/employee/atten')
const Employeeverify = require('../verifyjs/empv');
const verifyToken = require("../verifyjs/empv")
const verifyadminToken = require("../verifyjs/empv")
const bcrypt = require('bcryptjs')
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser'); // Middleware
const jwt = require("jsonwebtoken")
const multer=require('multer')
const cookie = require('cookie-parser')
const salt = 10;

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


// var storage = multer.diskStorage({
//     destination: 'src',

//     destination: (req, file, callBack) => {
//         callBack(null, 'src')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.originalname)
//     }
// })
// var upload = multer({
//     storage: storage
// });

router.get('/', (req, res) => {
    console.log('demo page')
    res.send("<h1> hii</h1>")

})
router.post('/register', async (req, res) => {
    console.log('demo page')
    // res.send('api process integer')
    const { name, fname, email, contact,address,salary,password: plainTextPassword } = req.body

    const password = await bcrypt.hash(plainTextPassword, salt);

    // const data={
    // name:name,
    // fname:fname,
    // email:email,
    // contact:contact,
    // password: password,
    // }
    try {
        const check = await Employee.findOne({ email: email })
        if (check) {
            console.log('user exist')
            res.send('user alredy registered')
        } else {
            const response = await Employee.create({
                name, fname, email, contact,address,salary,password,
                // filename:req.file.filename
            })
            res.send(response)
            console.log(`${name}, Registration Successfull`)
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.post('/adminlogin', (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email == "" && password == "") {
            console.log('enter email and password')
            res.send('enter email and password')
        } else if (email == "admin312@gmail.com" && password == "boolean212") {
            token = jwt.sign({
                email: email,
                type: 'admin'
            }, "Booleanai$23@as$%",
                {
                    expiresIn: '2 hours'
                })
            console.log(token)
            res.send({"token":token})
        } else {
            console.log('Your password  and email has been worng.')
            res.send('Your password  and email has been worng.')
        }
    } catch (e) {
        console.log(e)
        return { status: 'error', error: 'timed out' }
    }
})


router.post('/emplogin', async (req, res) => {
    const { email, password } = req.body
    const response = await Employeeverify(email, password)
    console.log(response)
    if (response.status === 'ok') {
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
        res.send({"token":token})
    } else {
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

router.get('/empdashboard', (req, res) => {
    if (verifyToken(token)){
        console.log(verifyToken)
        console.log('token generate true')
    } else {
        console.log('token generate false')
    }
})
router.get('/admindashboard', (req, res) => {
    const token = req.cookies;
    if (verifyadminToken()) {
        console.log(token)
        console.log('token generate true')
    } else {
        console.log('token generate false')

    }
})




router.get('/admin', (req, res) => {
    res.send('welcome back', data)
})


router.get("/allemp", async (req, res) => {
    try {
        let user = await Employee.find({})
        res.send(user)
    }
    catch (err) {
        console.log(err)
    }

})

module.exports = router;