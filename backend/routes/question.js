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
router.put('/question/:id',(req,res)=>{
    let {question}= req.body;
    Course.findById(req.params.id,(err,course)=>{
        if(err)
        res.status(400).json({err});
        else{
            const newquestion = course.question.filter(ques=>ques.questionStatement!==question);
            course.question=newquestion;
            course.save().then(response=>res.status(200).json(response)).catch(err=>status(400).json({err}));
        }

    })
})
router.put('/publish/:id',(req,res)=>{
    let {passing_marks,marks}=req.body;
    Course.findById(req.params.id,(err,course)=>{
        if(err)
        res.status(400).json({err});
        else{
            course.published=true;
            course.marks=Number(marks);
            course.passing_marks=Number(passing_marks);
            course.save((err,course)=>{
                if(err)
                res.status(400).json(err);
                else
                {

                res.status(200).json(course);
                }
            });
        }
    })
})
module.exports= router;