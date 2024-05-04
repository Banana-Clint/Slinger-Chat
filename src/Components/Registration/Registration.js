import { useState } from "react";
import axios from "axios";
import "./Registration.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';

export default function Registration({registerClicked,setRegisterClicked}) {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userText, setUserText] = useState("");
  

  function registerClick(){
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
    <div className="Registration-Wrapper">
      <div className="Registration-Wrapper-Head"> 
     <p>create your account :</p>
     <FontAwesomeIcon id="Registration-Exit_Button" icon={faXmark} onClick={()=>setRegisterClicked(!registerClicked)} />
     </div>
     <div className="Registration-Form-Wrapper">
     <div className="Registration-Form" >
        <div className="Registration-Form_Element">  <p>Username:</p>  <input type= "text" onChange={(e)=>userChange(e.target.value)}/></div> 
        <div className="Registration-Form_Element">  <p>Password:</p>  <input type= "password" onChange={(e)=>passwordChange(e.target.value)}/></div> 
        <div className="Registration-Form_Element" >  <p>Email:</p>  <input type= "email" value={emailText} onChange={(e)=>emailChange(e.target.value)}/></div>  
                </div>
     </div>
   
                <button type="submit" onClick={registerClick} style={{width:'20%',color:"#00c800"}}>Register</button>

    </div>
  )
}
