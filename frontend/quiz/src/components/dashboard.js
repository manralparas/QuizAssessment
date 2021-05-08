import React from "react";
import AuthService from "../services/teacherauth.service";

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
    if(currentUser.message.role!=="Teacher")
    return(
        <div><h1>You are not authorized</h1></div>
    )
    else
     return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.message.name}</strong> Profile
        </h3>
      </header>
     <p>
        <strong>Id:</strong> {currentUser.message.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.message.email}
      </p>
     
    </div>
      
  );
};

export default Dashboard;