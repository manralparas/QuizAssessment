const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation } = req.body;
  Student.findOne({email: email})
   .then(student=>{
      if(student){
         return res.status(422).json({ errors: [{ student: "email already exists" }] });
      }else {
         const student = new Student({
           name: name,
           email: email,
           role:"Student",
           password: password,
         });
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         student.password = hash;
         student.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}
exports.signin = (req, res) => {
     let { email, password } = req.body;
     Student.findOne({ email: email }).then(student => {
       if (!student) {
         return res.status(404).json({
           errors: [{ student: "not found" }],
         });
       } else {
          bcrypt.compare(password, student.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password:
"incorrect" }] 
              });
             }
       let access_token = createJWT(
         student.email,
         student._id,
         3600
       );
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
            res.status(500).json({ erros: err });
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: student
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ erros: err });
        });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
   });
}