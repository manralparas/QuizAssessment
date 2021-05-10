const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let questionSchema = new Schema({
    question:String,
    correct_answer:String,
    wrong_answer:[String],
    level:String,
},{
    timestamps:true,
    collection:"Question"
})
module.exports = mongoose.model('Question',questionSchema);