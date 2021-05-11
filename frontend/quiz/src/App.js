import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import student from './student.png';

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import TeacherLogin from "./components/teacherlogin";
import Dashboard from "./components/dashboard";
import CreateCourse from "./components/CreateCourse";
import EditCourse from "./components/EditCourse";
import Quiz from "./components/Quiz";
import NotFound from "./components/404";
import Question from "./components/Question";
import Attempt from "./components/Attempt";
import TeacherSignup from "./components/TeacherRegister";

const App = () => {
   const [currentUser, setCurrentUser] = useState(undefined);  
   useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
     
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-orange">
        <Link to={"/"} className="navbar-brand">
          Navigus
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>

         
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser?.name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
          
        <Switch>
          <Route exact path="/">
            <div className="jumbotron">
            <h1>Welcome to Navigus E-learning Platform</h1> 
            <div className="section">
            <div><h2>The quiz maker for testing students in course in fun way! </h2>
            <div className="inner">
              {
                  currentUser ?(
                  <div>
                 <Link className="links" to={"/profile"}>Take quiz now</Link>
                 <Link className="links" to={"/dashboard"}>Create quiz now</Link>
                  </div>
            
                  ):(
                    <div>
                    <Link className="links" to={"/login"}>Take quiz now</Link>
                    <Link className="links" to={"/loginTeacher"}>Create quiz now</Link>
                    </div>
                  )

              }
            </div>
            </div>
            <img src={student} height="400px" width="600px"></img>
            </div> 
           </div> 
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/loginTeacher" component={TeacherLogin} />
          <Route exact path="/createCourse" component={CreateCourse} />
          <Route exact path="/course/:id" component={EditCourse} />
          <Route exact path="/course/quiz/:id" component={Quiz} />
          <Route exact path="/course/question/:id/" component={Question} />
          <Route exact path="/course/attempt/:id/" component={Attempt} />
          <Route exact path="/teacherSignup" component={TeacherSignup} />
          <Route path='/404' component={NotFound} />
          <Redirect to="/404"/>
        </Switch>
    </div>
  );
};

export default App;