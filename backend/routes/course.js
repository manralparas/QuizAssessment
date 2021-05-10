const express = require('express');
const router = express.Router();
const Course= require("../models/Course");
const { createCourse } = require('../controllers/course');
router.post('/course', createCourse);
router.delete('/course/:id',(req,res)=>{
    Course.findByIdAndDelete(req.params.id).then(response=>res.status(200).json({success:true,response}))
    .catch(err=>res.status(400).json({error:err}));
})
router.get('/course/:id',(req,res)=>{
    Course.findById(req.params.id,(err,course)=>{
        res.status(200).json(course);
    })
})
router.put('/course/:id',(req,res)=>{
    let {course_name,course_code}=req.body;
            const course= new Course({
            name:course_name,
            code:course_code,
            
        });
    Course.findById(req.params.id).then((course)=>{
        course.name=course_name;
        course.code=course_code;
        course.save().then(response=>res.status(400).json({success:true,response}))
    })

})
module.exports = router;