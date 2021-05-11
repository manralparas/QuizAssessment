import React,{useState} from 'react'
import './EditCourseStyle.css'
import './CreateCourseStyle.css';
import AuthService from "../services/teacherauth.service";
import axios from 'axios';
import {API_URL} from '../baseurl'
function EditCourse(props) {
    const currentUser = AuthService.getCurrentUser().message;
     const [name,setName]=useState("");
     const [code,setCode]=useState("");
     const handleSubmit=()=>{
            return axios.put(API_URL+"course/"+props.match.params.id,{
                  course_name:name,
                  course_code:code,
            }).then((response)=>{
                  alert("data submitted successfully");
                  console.log(response);
                  props.history.push("/dashboard");
                  window.location.reload();
            })
            .catch(err=>{
                console.log(err); 
                props.history.push("/dashboard");
                  window.location.reload();})
     }
  
    return (
   
    <>
        <div className="wrapper">
            
            <h2>
               Create Course
            </h2>
        
        <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="course name" class="form-label">Course Name</label>
             <input type="text" class="form-control" onChange={(e)=>setName(e.target.value)} ></input>
       </div>
       <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="course code" class="form-label">Course Code</label>
             <input type="text" class="form-control" onChange={(e)=>setCode(e.target.value)} ></input>
       </div>
       <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="teacher name" class="form-label">Teacher Name</label>
             <input type="email" class="form-control" id="" value={currentUser.name} disabled></input>
       </div>
       <div className="mt-2">
             <button onClick={handleSubmit} class="btn btn-success btn-lg" id="" value="Create Course">Edit Course</button>
       </div>
    </div>
    </>
    )   
}

export default EditCourse
