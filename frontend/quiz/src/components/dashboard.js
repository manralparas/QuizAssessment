import React from "react";
import AuthService from "../services/teacherauth.service";
import './dashboardStyle.css';
import { Link } from "react-router-dom";
const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser().message;
    if(currentUser.role!=="Teacher")
    return(
        <div><h1>You are not authorized</h1></div>
    )
    else
     return (
    <div className="container">
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
    </div>
      
  );
};

export default Dashboard;