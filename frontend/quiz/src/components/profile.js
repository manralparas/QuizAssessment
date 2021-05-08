import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

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

export default Profile;