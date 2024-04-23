import { useState } from "react"





export default function Chat(){

const[messages,setMeasages]=useState(["msdg1","msihg2","hello","Mahah"])


return(
    <div className="Chat-Wrapper">
        <ul>
        {messages?messages.map((message,i)=>{
            return(<li style={{color:"white"}} key={i}>{message+"k"+i}</li>)
        }):null}</ul>
            
    </div>
)


}