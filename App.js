import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ChatRoom from './Components/ChatRoom/chatRoom.js'; 
import "./App.css"
import { useState } from 'react';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm.js';
import axios from 'axios';
function App() {
  const [view,setView] = useState('chatRoom'); // replace 'ChatRoom' with your initial view
  const [usernameText, setusernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userRole, setUserRole]= useState("")
  

  function loginClick() {
    axios.post("http://localhost:8080/login", {
      username: usernameText,
      password: passwordText
    })
    .then((response) => {
      console.log(response); // Log the response (optional)
      setUserRole(response.data.role); // Set the user role
      setView("ChatRoom"); // Set the view to "ChatRoom"
    })
    .catch(error => console.log(error));
  }
  

  function usernameChange (eventText) {
    setusernameText(eventText);
  }

  function passwordChange (eventText) {
    setPasswordText(eventText);
  }

  if (view === 'chatRoom') {
    return <ChatRoom/>;
  }
  if(view === "register"){
    return <RegistrationForm/>
  }



  return (
    <div className="App">
      <div className="App-header">
        <img src={require("./Components/Images/logo.png")} className="App-logo" alt="logo" />
      </div>
    
        <div className="Login-form">
          <div className="Left-img"><img src={require("./Components/Images/newpiece.jpg")} alt="BrandingImage"/></div>
          <div className="Right-stuff">
            <div className="Rs-top">
              <h1>Login</h1>
              <p>Don't have an account yet? <Router><Link onClick={()=>setView('register')}>Sign up</Link></Router></p>
            </div>
            <div className="Rs-middle">
              <div className="First-half">
                <label>Username</label>
                <input type= "text" onChange={(e)=>usernameChange(e.target.value)}/>
                <label>Password</label>
                <input type= "password" onChange={(e)=>passwordChange(e.target.value)}/>
                <input id="remember-me" style={{marginRight:'80px'}} type="checkbox"></input>
                <label htmlFor="remember-me">Remember me</label>
                <button style={{backgroundColor:"#f50ee9",border:"none",padding:"0.8vw 7vw",color:"white",fontWeight:"700"}}
                onClick={loginClick}>Login</button>
              </div>
              <div className="Second-half"></div>
            </div>
          </div>
        </div>
    
    </div>
  );
}

export default App;
