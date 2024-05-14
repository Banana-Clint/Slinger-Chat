
import"./Room.css"  
import { useState } from "react"
import Mail from '../Images/Mail Box.png' 
import Chat from "../Chat/Chat.js"
import User from "../User/User.js"
export default function Room(){


    const[publicRooms,setPublicRooms]=useState([{name:"En",type:"Public",members:null,image:require("../Images/UK.png"),
messages:[{message:'Hello and welcome to the english speaking room.',sender:"Founder",timestamp:"10:30"}]} ]);
const[chat,setChat]=useState(null);

    return(
    <div className="Room-Wrapper">
        <div className="Dashboard-Wrapper">
        <div className="Dashboard">
        <div className="Dashboard-Tools">
            <div className="NavButtons-Wrapper">
                    <button >
            <p style={{width:"clamp(60px,10vw,50px)",fontSize:"30px",margin:"0" }}>+</p>
         </button>
                <button ><img src={Mail} alt="Non"/> 
            <span >Mess
             ages
        </span></button>
            {publicRooms
              ? publicRooms.map((room,roomIndex) => (
                
                 <button key={roomIndex} ><img src={room.image} alt={room.name} /> <span 
                 onClick={()=>setChat(room)}> {room.name}</span>
                </button>
                ))
              : null}
            </div> 
            </div>        
            {
              chat? <>
            <div className="Display-Wrapper">
          
              <h3>{chat.type+" Room "+chat.name}</h3> 
               <Chat chat={chat} setChat={setChat} publicRooms={publicRooms} setPublicRooms={setPublicRooms} />
              
            </div>
              </>:<User/>}
            </div> 
        </div>

    </div>
    )
}