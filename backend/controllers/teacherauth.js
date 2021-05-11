const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation,unique_id } = req.body;
  Teacher.findOne({email: email})
   .then(teacher=>{
      if(teacher){
         return res.status(422).json({ errors: [{ teacher: "email already exists" }] });
      }
      else {
         const teacher = new Teacher({
           name: name,
           email: email,
           role:"Teacher",
           password: password,
         });
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         teacher.password = hash;
         teacher.save()
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
     Teacher.findOne({ email: email }).then(teacher => {
       if (!teacher) {
         return res.status(404).json({
           errors: [{ teacher: "not found" }],
         });
       } else {
          bcrypt.compare(password, teacher.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password:
"incorrect" }] 
              });
             }
       let access_token = createJWT(
         teacher.email,
         teacher._id,
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
                message: teacher
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