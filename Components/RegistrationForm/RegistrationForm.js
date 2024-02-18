import { useState } from "react";
import axios from "axios";

export default function RegistrationForm () {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userText, setUserText] = useState("");

  

  function loginClick(){
    axios.post("http://localHost:8080/Register",{
      username:userText,
      email:emailText,
      password:passwordText
    })
    .then(response=>console.log(response))
    .catch(error=>console.log(error))

  }

  function emailChange (eventText) {
    setEmailText(eventText);
  }
  
  function userChange (eventText) {
    setUserText(eventText);
  }

  function passwordChange (eventText) {
    setPasswordText(eventText);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style = {{ width: "100%" , display: "flex" }} >
        <div style = {{ width:"15%", justifyContent: 'center', alignItems: 'center' }} >
          <p>Username:</p>
          <p>User Password:</p>
          <p>User Email</p>
        </div>
        <div style = {{ width:"50%",display: "flex",flexDirection:"column",gap:"20px",justifyContent:"center" }}>
           <input type= "text" onChange={(e)=>userChange(e.target.value)}/>
          <input type= "password" onChange={(e)=>passwordChange(e.target.value)}/>
          <input type= "email" value={emailText} onChange={(e)=>emailChange(e.target.value)}/>
   
        </div>
      </div>
      <button type="submit" onClick={loginClick} style={{width:'20%'}}>Register</button>
    </div>
  )
}
