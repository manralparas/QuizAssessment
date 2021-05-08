const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role:{
       type:String,
       required:true
   }
},{
   timestamps: true,
   collection: 'Teacher'
})
module.exports = mongoose.model('Teacher', userSchema);