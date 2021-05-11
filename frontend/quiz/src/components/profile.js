import React,{useState,useEffect} from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import {API_URL} from '../baseurl'
const Profile = () => {

  const currentUser = AuthService.getCurrentUser().message;
  console.log(currentUser._id);
  const [courses,setCourse]= useState([{}]);
  useEffect(()=>{
      fetch(API_URL+"course")
      .then((res)=>res.json().then(res=>setCourse(res.response)))
      .catch((err)=>console.log(err))

  },{courses})
const course=courses.map((cour)=>{
  console.log()
return(
<div class="card  col-md-12">
  <div class="card-body">
    <h4>{cour.name}</h4>
    <p>Quiz Assigned:<b>{cour.published?" Yes":" No"}</b></p>
<p>Passing Marks:<b>{cour.published? cour.passing_marks:"N/A"}</b></p>
    <p>Question:<b>{cour.published?"10":"N/A"}</b></p>
      {cour.attempted?.some(x=>x==currentUser._id)?(<button className="btn btn-primary" disabled>Attempted</button>):(
  <Link to={"/course/attempt/"+cour._id}>  <button className="btn btn-primary" disabled={!cour.published} >Take Quiz</button></Link>
      )}
  </div>
</div>
)}
)
     return (
    <div className="wrapper">
      <div className="header">
        <h3>
          Welcome Student {currentUser.name}!
        </h3>
      </div>
      <div>
      <div className="contain">
        <h3 className="mb-2">courses are :-</h3>
        <div className="row">
        {course}
        </div>
      </div>
      </div>
    </div>
      
  );
};

export default Profile;