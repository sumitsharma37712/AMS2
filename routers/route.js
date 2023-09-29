const express = require('express')
const router = new express.Router();
const session = require('express-session')
require('dotenv').config();

const Employee = require('../database/models/admin/register_emp')
const adminregister = require('../database/models/admin/registeradmin')
const Employeeatten = require('../database/models/employee/atten')
// const Employeeverify = require('../verifyjs/empv');
const verifyToken = require("../verifyjs/empv")
const verifyadminToken = require("../verifyjs/empv")
const bcrypt = require('bcryptjs')
const cors = require('cors');
router.use(cors())
const bodyParser = require('body-parser'); // Middleware
const jwt = require("jsonwebtoken")
const multer = require('multer')
const cookie = require('cookie-parser')
const salt = 10;
JWT_SECRET = process.env.JWT

router.use(bodyParser.urlencoded({ extended: false }));

router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


var storage = multer.diskStorage({
    destination: 'src',

    destination: (req, file, callBack) => {
        callBack(null, 'src')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
});

router.get('/', (req, res) => {
    console.log('demo page')
    res.send("<h1> hii</h1>")

})
router.post('/register', upload.single('filename'), async (req, res) => {
    console.log('demo page')
    // res.send('api process integer')
    const { name, fname, email, contact, address, salary, password: plainTextPassword } = req.body

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
                name, fname, email, contact, address, salary, password,
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
            res.send({error:"'enter email and password"})

        } else if (email == "admin312@gmail.com" && password == "boolean212") {
            req.session.email = email
            console.log(req.session.email)
            token = jwt.sign({
                email: email,
                type: 'admin'
            }, "Booleanai$23@as$%",
                {
                    expiresIn: '324 seconds'
                })
            console.log('Login admin')
            if (!token) {
                res.send("token not generate")
            } else {
                res.send({ "token": token })
            }


        } else {
            console.log({"err":'Your password  and email has been worng.'})
            res.send({error:"Your password  and email has been worng."})
        }
    } catch (e) {
        console.log(e)
        res.send({ status: 'error', error: 'timed out' })
    }
})


router.post('/emplogin', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Employee.findOne({ email: email })

        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(await password, user.password)) {
            // creating a JWT token
            tdata = {
                id: user._id,
                email: user.email,
                type: 'user'
            }, { expiresIn: '10 minutes' }
            const token = jwt.sign(tdata, JWT_SECRET)
            console.log(token)
            res.send({ data: user, token: token })
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})
// const response = await Employeeverify(email, password)
// console.log(response)
// res.send( {status:'ok',data:response})
// res.send({ "token": token })
// if (response.status === 'ok') {
//     res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
// } else {
//     res.json(response);
// }

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

router.get('/empdashboard', (req, res) => {
    if (verifyToken(token)) {
        console.log(verifyToken)
        console.log('token generate true')
    } else {
        console.log('token generate false')
    }
})




// router.get('/admindashboard', (req, res) => {
//     const token = req.body;
//     console.log({token})
//     try {
//         const verify = jwt.verify(token, "Booleanai$23@as$%", (err, res) => {
//             if (err) {
//                 return "token Expire"
//             }
//             return res.send("data send")

//         });

//         if (verify == "token Expire") {
//             res.send({ data: "token expired" })
//         } else {
//             return false

//         };
//     } catch (error) {
//         console.log(JSON.stringify(error), "error");
//         res.send('error')
//         return false;
//     }

//     // if(req.session.email){
//     //     return res.send({valid:true,email:req.session.email})
//     // }else{
//     //     return res.send({valid:false})
//     // }




// })




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

router.delete('/allemp/:id', async (req, res) => {
    let del = req.params.id
    try {
        let emp = await Employee.deleteOne({ _id: del })
        if (emp) {
            res.send('delete success')
        } else {
            res.send('not delete data')
        }
    } catch (e) {
        res.status(404).send(e)
    }
})

router.put('/allemp/:id', async (req, res) => {
    let upl = req.params.id
    let { name, fname, } = req.body
    // console.log(name, fname)
    try {
        let update = await Employee.findByIdAndUpdate({ _id: upl }, { $set: { name, fname } })        
        if (update) {
            res.status(200).send('update success')
            console.log('update success')
        } else {
            res.status(200).send('update not success')
            console.log('update not success')
        }
    } catch (e) {
        res.status(496).send(e)
        console.log(e)
    }
})







module.exports = router;