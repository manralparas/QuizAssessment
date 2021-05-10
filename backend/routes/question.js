const express = require('express');
const router = express.Router();
const Course= require("../models/Course");
router.post('/question/:id',(req,res)=>{
    let {questionStatement,correct_answer,wrong_answer}=req.body;
    const newQuestion ={questionStatement,correct_answer,wrong_answer}
    Course.findById(req.params.id,(err,course)=>{
        if(err)
        res.status(400).json({err});
        else{
            console.log(newQuestion);
            console.log(course.question);
        course.question.push(newQuestion);
        course.NumberOfQuestion++;
        course.save().then(response=>res.status(200).json({response})).catch(err=>res.status(400).json({err}));
        }
    })
})
router.get('/question/:id',(req,res)=>{
    Course.findById(req.params.id,(err,course)=>{
        if(err)
        res.status(400).json({err});
        else{
            res.status(200).json(course.question);
        }
    })

})
module.exports= router;