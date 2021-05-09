
const Course = require('../models/Course');
const mongoose = require('mongoose');
exports.Course=(req,res,next)=>{
    const id = req.params.id;
    var objectId = mongoose.Types.ObjectId(id);
    Course.find({teacher:objectId}).then((course)=>res.status(200).json({success:200,response:course}))
    .catch((err)=>res.status(400).json({error:400,response:err}));
}