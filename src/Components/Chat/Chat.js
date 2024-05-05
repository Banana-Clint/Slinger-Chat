import './Chat.css'
import { useState } from 'react'




export default function Chat({chat,setChat}){
  const[isTyping,setIsTyping]=useState(false)

    const[textMessage,setTextMessage]=useState(null)
    const messageChange=(e)=>{
      if(isTyping===true){
        setTextMessage(e.target.value)
        setTimeout (()=>setIsTyping(false),6000)
      }else{
      setIsTyping(true);
      setTextMessage(e.target.value)
      setTimeout (()=>setIsTyping(false),6000)
      }
      

    }
    const addMessage = (e) => {
        if (e.key === "Enter") {
          setChat({
            ...chat,
            messages: [...chat.messages, { message: textMessage, sender: "Paul", timestamp: "11:00" }]
          });
          setTextMessage("")
        }

      };
      

return(
    <div className="Chat-Wrapper">
        <ul>
        {chat?chat.messages.map((message,i)=>{
            return(<li  key={i}>{"("+message.timestamp+")"}<p><b>{message.sender+": "}</b>{message.message} </p></li>)
        }):null}
        {isTyping?<p>Paul is typing</p>:null}</ul>
        <input type='textArea' value={textMessage} onChange={(e)=>{messageChange(e)}} onKeyDown={addMessage }/>
            
    </div>
)


}