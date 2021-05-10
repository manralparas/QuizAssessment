import React,{useEffect, useState} from "react";
import AuthService from "../services/teacherauth.service";
import './dashboardStyle.css';
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:8000/api/";
const Dashboard = (props) => {

  const currentUser = AuthService.getCurrentUser().message;
  console.log(currentUser._id);
  const [courses,setCourse]= useState([{}]);
  useEffect(()=>{
      fetch(API_URL+"course/"+currentUser._id)
      .then((res)=>res.json().then(res=>setCourse(res.response)))
      .catch((err)=>console.log(err))

  },{courses})
const deleteCourse=(deleteId)=>{
  return axios.delete(API_URL+"course/"+deleteId)
  .then((res)=>{
    alert("deleted Sucessfully")
    console.log(res);
    props.history.push("/dashboard");
    window.location.reload();
})
  .catch(err=>alert(err))
}

const course=courses.map((cour)=>{
return(
<div class="card m-3 col-md-5">
  <div class="card-body">
    <h4>{cour.name}</h4>
    <p>Quiz Assigned:<b>{cour.published?" Yes":" No"}</b></p>
    <Link to={`course/${cour._id}`}><button className="m-2 btn btn-warning" >Edit</button></Link> 
    <Link to={`course/quiz/${cour._id}`}><button className="m-2 btn btn-primary">Quiz</button></Link>
    <button className="m-2 btn btn-danger" onClick={()=>deleteCourse(cour._id)}>Delete</button>
  </div>
</div>
)}
)
    if(currentUser.role!=="Teacher")
    return(
        <div><h1>You are not authorized</h1></div>
    )
    else
     return (
    <div className="wrapper">
      <div className="header">
        <h3>
          Welcome {currentUser.name}!
        </h3>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Link to="./createCourse">
        <button className="btn btn-primary">Create New Course +</button>
        </Link>
      </div>
      <div>
      <div className="contain">
        <h3 className="mb-2">Your course are :-</h3>
        <div className="row">
        {course}
        </div>
      </div>
      </div>
    </div>
      
  );
};

export default Dashboard;