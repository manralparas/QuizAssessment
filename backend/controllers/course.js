const Course = require('../models/Course');
exports.createCourse=(req,res,next)=>{

let {course_name,course_code,teacher_name,teacher_id}=req.body;
Course.findOne({name:course_name}).then((course)=>{
    if(course)
    {
        return res.status(422).json({errors:[{course:"Course already exist"}]});
    }
    else {

        const course= new Course({
            name:course_name,
            code:course_code,
            teacherName:teacher_name,
            teacher:teacher_id
        });
        course.save().then(response => {
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
    }
})


}