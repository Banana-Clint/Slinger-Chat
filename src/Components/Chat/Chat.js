import './Chat.css'
import React, { useEffect, useRef, useState  } from 'react';




export default function Chat({chat,setChat,publicRooms,setPublicRooms}){
  const[isTyping,setIsTyping]=useState(false)
  const[textMessage,setTextMessage]=useState('')
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  
  const messageChange=(e)=>{
      if(isTyping===true){
        setTextMessage(e.target.value)
        setTimeout (()=>setIsTyping(false),4000)
      }else{
      setTimeout (()=>
        setIsTyping(true),500)
      setTextMessage(e.target.value)
      setTimeout (()=>setIsTyping(false),4000)
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
        // setPublicRooms({
        //   ...publicRooms,
          
        // })

      };
      

      return(
        <div className="Chat-Wrapper">
            <ul>
            {chat?chat.messages.map((message,i)=>{
                return(<li  key={i}>{"("+message.timestamp+")"}<p><b>{message.sender+": "}</b>{message.message} </p></li>)
            }):null}
            {isTyping?<p>Paul is typing...</p>:<p> </p>}
            <div ref={messagesEndRef} />
            </ul>
            <input type='textArea' value={textMessage} onChange={(e)=>{messageChange(e)}} onKeyDown={addMessage }/>
        </div>
    )

    


}