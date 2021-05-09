import React,{useState} from 'react'
import './CreateCourseStyle.css';
import AuthService from "../services/teacherauth.service";

function CreateCourse() {
     const currentUser = AuthService.getCurrentUser().message;
     const [name,setName]=useState("");
     const [code,setCode]=useState("");
     const handleSubmit=()=>{
        alert(`name = ${name} code = ${code}`);

     }
    return (
    <>
        <div className="wrapper">
            
            <h2>
               Create Course
            </h2>
        
        <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="course name" class="form-label">Course Name</label>
             <input type="text" class="form-control" onChange={(e)=>setName(e.target.value)}  placeholder="DBMS"></input>
       </div>
       <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="course code" class="form-label">Course Code</label>
             <input type="text" class="form-control" onChange={(e)=>setCode(e.target.value)} placeholder="CSE121"></input>
       </div>
       <div className="col-md-4 d-flex justify-content-center coursename">
             <label for="teacher name" class="form-label">Teacher Name</label>
             <input type="email" class="form-control" id="" value={currentUser.name} disabled></input>
       </div>
       <div className="mt-2">
             <button onClick={handleSubmit} class="btn btn-success btn-lg" id="" value="Create Course">Create Course</button>
       </div>
    </div>
    </>
    )
}

export default CreateCourse
