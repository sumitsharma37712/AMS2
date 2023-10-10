const express = require("express");
const router = new express.Router();
const session = require("express-session");
require("dotenv").config();

const Employee = require("../database/models/admin/register_emp");
const adminregister = require("../database/models/admin/registeradmin");
const Employeeatten = require("../database/models/employee/atten");
// const Employeeverify = require('../verifyjs/empv');
const verifyToken = require("../verifyjs/empv");
const verifyadminToken = require("../verifyjs/empv");

// route
const { employeeRegister, employeeAuth,attendanceRegister } = require('../controllers/userController')
const { adminRegister, adminAuth,adminLog } = require('../controllers/adminController')




const cors = require("cors");
router.use(cors());
const bodyParser = require("body-parser"); // Middleware
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cookie = require("cookie-parser");
const salt = 10;
JWT_SECRET = process.env.JWT;

router.use(bodyParser.urlencoded({ extended: false }));

router.use(
  session({
    secret: "secretkeyforusersa",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

var storage = multer.diskStorage({
  destination: "src",

  destination: (req, file, callBack) => {
    callBack(null, "src"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
});



// Alll Authenticate employee,admin register and login system here 
// admin register control
router.route('/admin/adminregister', upload.single("filename")).post(adminRegister)
router.route('/admin/adminlogin').post(adminAuth)
router.route('/login/admindefalut login').post(adminLog)
// employee register control admin part
router.route('/dashboard/employeeregister', upload.single("filename")).post(employeeRegister)
// employee login part dynamic using section
router.route('/login/emplogin').post(employeeAuth)
// Alll Authenticate employee,admin register and login system end here 









router.get("/", (req, res) => {
  console.log("demo page");
  res.send("<h1> hii</h1>");
});

router.get("/admin/dashboard", (req, res) => {
  const token = req.body.token;
  if (token) {
    const decode = jwt.verify(token, 'erueoilfu34w894wedskndskf');
    res.json({
      login: true,
      data: decode,
    });
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }

});








router.get("/login/empdashboard", (req, res) => {
  res.status(200).json({ data: user });
});
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

// router.get("/employee/empdashboard", (req, res) => {
//   if (verifyToken(token)) {
//     console.log(verifyToken);
//     console.log("token generate true");
//   } else {
//     console.log("token generate false");
//   }
// });

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

router.get("/admin/dashboard", (req, res) => {
  res.send("welcome back", data);
});



// all employee details show here link
router.get("/empdashboard/allemp", async (req, res) => {
  try {
    let user = await Employee.find({});
    res.send({ data: user });
    console.log("all details");
  } catch (err) {
    console.log(err);
  }
});
// a spacific data for employee delete a record for a single employee
router.delete("/empdashboard/allemp/:id", async (req, res) => {
  let del = req.params.id;
  try {
    let emp = await Employee.deleteOne({ _id: del });
    if (emp) {
      res.send("delete success");
    } else {
      res.send("not delete data");
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
// a spacific data for employee update a record for a single employee 
router.put("/empdashboard/allemp/:id", async (req, res) => {
  let upl = req.params.id;
  let { name, fname } = req.body;
  // console.log(name, fname)
  try {
    let update = await Employee.findByIdAndUpdate(
      { _id: upl },
      { $set: { name, fname } }
    );
    if (update) {
      res.status(200).send("update success");
      console.log("update success");
    } else {
      res.status(200).send("update not success");
      console.log("update not success");
    }
  } catch (e) {
    res.status(496).send(e);
    console.log(e);
  }
});

// password update/change
router.post("/employee/passwordc", async (req, res) => {
  const email = req.body;
  try {
    const response = await Employee.find(email);
    if (response) {
      res.send(response);
    } else {
      res.send({ err: "user not found" });
    }
  } catch (e) {
    res.send({ e });
    console.log(e);
  }
});

router.put("/employee/passwordc/:email", async (req, res) => {
  const email = req.params.email;
  const { password: plainTextPassword } = req.body;
  const npassword = await bcrypt.hash(plainTextPassword, salt);
  try {
    const response = await Employee.updateOne(
      { email: email },
      { $set: { password: npassword } }
    );
    if (response) {
      res.status(200).send({ success: "password updated!" });
      console.log({ success: "password updated!" });
    } else {
      res.status(200).send({ err: "password not  updated!" });
      console.log({ err: "password not updated!" });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log({ e });
  }

  // if(await bcrypt.compare(await oldpass, response.password)){
  //     const npassword = await bcrypt.hash(plainTextPassword, salt);
  //     const response =await Employee.findByIdAndUpdate({ email: email }, { $set: { password:npassword } })
  //     if (response) {
  //         res.status(200).send('update success')
  //         console.log('update success')
  //     } else {
  //         res.status(200).send('update not success')
  //         console.log('update not success')
  //     }

  // }
});

// attendance details
router.route("/employee/atten").post(attendanceRegister);












router.post("/employee/atten/:date", async (req, res) => {
  const date = req.params.date;
  const { punchout } = req.body;
  try {
    console.log(date);
    const atteno = await Employeeatten.updateMany(
      { date },
      { $set: { punchout: punchout } }
    );
    console.log(punchout);
    res.send(atteno);
    console.log({ "atten update": atteno });
    // const atteno1=await Employeeatten.findById({_id})
    // res.send(atteno1)
    console.log();
  } catch (e) {
    console.log(e);
    res.send({ err: e });
  }
});

router.get("/employee/attenD", async (req, res) => {
  const filters = req.query;
  try {
    const response = await Employeeatten.find({});
    const filteredUsers = response.filter((user) => {
      let isValid = true;
      for (key in filters) {
        // console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  } catch (e) {
    console.log(e);
    res.send({ err: e });
  }
});

router.get("/employee/attena", async (req, res) => {
  try {
    const response = await Employeeatten.find({ atten: "absent" });
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send({ err: e });
  }
});
router.get("/employee/attenp", async (req, res) => {
  const date = new Date();
  console.log(date);
  try {
    const response = await Employeeatten.find({
      $and: [{ date: "01-08-2023" }, { atten: "present" }],
    });
    const response1 = await Employeeatten.find({
      $and: [{ date: "01-08-2023" }, { atten: "absent" }],
    });

    const response2 = await Employeeatten.find({
      $and: [{ date: "02-08-2023" }, { atten: "present" }],
    });
    const response21 = await Employeeatten.find({
      $and: [{ date: "02-08-2023" }, { atten: "absent" }],
    });

    const response3 = await Employeeatten.find({
      $and: [{ date: "03-08-2023" }, { atten: "present" }],
    });
    const response31 = await Employeeatten.find({
      $and: [{ date: "03-08-2023" }, { atten: "absent" }],
    });

    const response4 = await Employeeatten.find({
      $and: [{ date: "04-08-2023" }, { atten: "present" }],
    });
    const response41 = await Employeeatten.find({
      $and: [{ date: "04-08-2023" }, { atten: "absent" }],
    });

    const response5 = await Employeeatten.find({
      $and: [{ date: "05-08-2023" }, { atten: "present" }],
    });
    const response51 = await Employeeatten.find({
      $and: [{ date: "05-08-2023" }, { atten: "absent" }],
    });
    let user = await Employee.find({});
    res.send({
      response,
      response1,
      response2,
      response21,
      response3,
      response31,
      response4,
      response41,
      response5,
      response51,
      user,
    });
  } catch (e) {
    console.log(e);
    res.send({ err: e });
  }
});

// filter

router.get("/employee/attenag", async (req, res) => {
  const filters = req.query
  try {
    const response = await Employeeatten.aggregate([
      {
        $lookup: {
          from: "registers",
          localField: "empID",
          foreignField: "empID",
          as: "result",
        },
      },
    ]);
    const filteredUsers = response.filter((user) => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
    // res.send(response);
  } catch (e) {
    console.log(e);
    res.send({ err: e });
  }
});

// all emp details and show current present

module.exports = router;
