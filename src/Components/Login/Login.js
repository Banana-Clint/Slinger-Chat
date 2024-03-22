import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ChatRoom from '../Room/Room.js'; 
import "./Login.css"
import { useState } from 'react';
import RegistrationForm from '../Registration/Registration.js';
import axios from 'axios';
import Header from "../Header/Header.js";
import Bubble from "./Bubble.js";
import Model1 from "../3DModels/Model1.js"





export default function Login(){

    const [view,setView] = useState(''); 
    const [usernameText, setusernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [userRole, setUserRole]= useState("")


function loginClick() {
  axios.post("http://localhost:8080/login", {
    username: usernameText,
    password: passwordText
  })
  .then((response) => {
    console.log(response); // Log the response 
    setUserRole(response.data.role); // Set the user role
    setView("ChatRoom"); // Set the view to Chat Room
  })
  .catch(error => console.log(error));
}


function usernameChange (eventText) {
  setusernameText(eventText);
}

function passwordChange (eventText) {
  setPasswordText(eventText);
}

if (view === 'Room') {
  return <ChatRoom/>;
}
if(view === "Registration"){
  return <RegistrationForm/>
}


return(<div className="App">
      <div id="FadeOutEffect"></div>
     <Header/>
     <div    
          className="Login-Form_Wrapper">

    <div 
          className="Login-Img">
     
     <Model1/>
          <Bubble/></div>

      <div 
          className="Login-Form">
          <input
          id='Login-Credentials'
          type= "text"
          placeholder={"Username"}
          onChange={(e)=>usernameChange(e.target.value)}/>
          <input 
          id='Login-Credentials'
          type= "password"
          placeholder={"Password"}
          onChange={(e)=>passwordChange(e.target.value)}/>
        
          <button  
          onClick={loginClick}>Login</button>
          <p>Don't have an account yet? <Router>
          <Link className='Link'
          onClick={()=>setView('Registration')}>Sign up</Link></Router></p>
        </div>
     </div>

</div>)


}