const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let quizSchema = new Schema({
   question:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"question",
   }],
   totalquestion:Number,
   passMarks:Number,
   points:Number,
},{
   timestamps: true,
   collection: 'Quiz'
})
module.exports = mongoose.model('Quiz', quizSchema);