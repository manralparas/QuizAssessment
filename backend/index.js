const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
//import routes
const courseRoutes=require('./routes/course')
const authRoutes = require('./routes/auth');
const teacherauth = require('./routes/teacherauth');
const teacherCourse = require('./routes/teacherCourse');
const { db } = require('./models/Student');
//app
const app = express();
// db
mongoose
  .connect(process.env.DATABASE,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
   })
  .then(() => console.log('DB Connected'));
//middlewares
app.use(bodyParser.json());
app.use(cors());
//routes middleware
app.use('/api', authRoutes);
app.use('/api',teacherauth);
app.use('/api',courseRoutes);
app.use('/api',teacherCourse);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});