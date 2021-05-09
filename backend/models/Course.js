const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let courseSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   code:String,
   teacherName:String,
   teacher:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Teacher",
       required:true
   },
   attempted:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Student",
   }],
   quiz:{type:mongoose.Schema.Types.ObjectId,ref:"quiz"}
},{
   timestamps: true,
   collection: 'Course'
})
module.exports = mongoose.model('Course', courseSchema);