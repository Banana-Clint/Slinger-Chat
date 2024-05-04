import './Chat.css'
import { useState } from 'react'




export default function Chat({chat,setChat}){

    const[textMessage,setTextMessage]=useState(null)
    const messageChange=(e)=>{
        setTextMessage(e.target.value)

    }
    const addMessage = (e) => {
        if (e.key === "Enter") {
          setChat({
            ...chat,
            messages: [...chat.messages, { message: textMessage, sender: "Founder", timestamp: "11:00" }]
          });
          setTextMessage("")
        }

      };
      

return(
    <div className="Chat-Wrapper">
        <ul>
        {chat?chat.messages.map((message,i)=>{
            return(<li  key={i}>{"("+message.timestamp+")"}<p><b>{message.sender+": "}</b>{message.message} </p></li>)
        }):null}</ul>
        <input type='textArea' value={textMessage} onChange={(e)=>{messageChange(e)}} onKeyDown={addMessage }/>
            
    </div>
)


}