const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employee = require('../database/models/admin/register_emp')
const Employeeatten = require('../database/models/employee/atten')
const salt = 10;
JWT_SECRET = process.env.JWT;

// employee register and login  
const employeeRegister = asyncHandler(async (req, res) => {
  const { empID, name, fname, email, contact, address, salary, password: plainTextPassword, } = req.body;
  const password = await bcrypt.hash(plainTextPassword, salt);
  try {
    const check = await Employee.findOne({ email: email });
    const check2 = await Employee.findOne({ empID: empID });
    if (check) {
      console.log("user exist");
      res.send("user alredy registered");
    } else if (check2) {
      console.log("user exist");
      res.send("user alredy registered");
    } else {
      const response = await Employee.create({
        empID, name, fname, email, contact, address, salary, password,
        // filename:req.file.filename
      });
      res.send(response);
      console.log(`${name}, Registration Successfull`);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})
const employeeAuth = asyncHandler(async (req, res) => {
  const { email, password, empID } = req.body;
  try {
    const user = await Employee.findOne({ email: email });
    const user1 = await Employee.findOne({ empID: empID });

    if (!user) {
      return { status: "error", error: "user not found" };
    }
    if (await bcrypt.compare(await password, user.password)) {
      // creating a JWT token
      (tdata = {
        id: user._id,
        email: user.email,
        type: "user",
      }),
        { expiresIn: "10 minutes" };
      const token = jwt.sign(tdata, JWT_SECRET);
      console.log(token);
      // const data=res.send({ data: user, token: token });
      if (!token) {
        res.send({ err: "token not generate" })
      } else {
        const data = res.json({
          _id: user._id,
          name: user.name,
          fnmae: user.fname,
          email: user.email,
          contact: user.contact,
          address: user.address,
          salary: user.salary,
          token: token
        })
      }
    } else {
      console.log("password not match");
      res.send({ err: "password not match" });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }

})



// attendace handler for employee section 

const attendanceRegister = asyncHandler(async (req, res) => {
  const { empID, atten, date, punchin } = req.body;

  try {
    // const date1 = await Employeeatten.find({ date })
    // const empID1 = await Employeeatten.find({ empID })
    // if (date1) {
    //   console.log('date same')
    //   if (!empID1) {
    //     const attendence = await Employeeatten.create({
    //       empID, atten, punchin, date,
    //     });
    //     res.send(attendence)      
    //   } else {
    //     console.log('stauts')
    //     res.send('status')
    //   } 
    // }
    // else {
    //   res.send('date not same ')
    // }
    const attendence = await Employeeatten.create({
            empID, atten, punchin, date,
          });
          res.send(attendence)
          
  } catch (error) {
    console.log({ 'error': error })
    res.send({ 'error': error })

  }


  // try {


  //   const attendence = await Employeeatten.create({
  //     empID,atten,punchin,date,
  //   });
  //   res.send(attendence);
  // } catch (e) {
  //   console.log(e);
  //   res.send({ err: e });
  // }

})











module.exports = { employeeRegister, employeeAuth, attendanceRegister }