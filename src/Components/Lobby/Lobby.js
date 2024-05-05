import { useState } from "react"
import "./Lobby.css"
import Chat from "../Chat/Chat"




export default function Lobby ({type}){
//Test Data
const[publicRooms,setPublicRooms]=useState([{name:"English",type:"Public",members:null,
messages:[{message:'Hello and welcome to the english speaking room.',sender:"Founder",timestamp:"10:30"}]},
{name:"Arabic",type:"Public",members:null,messages:[{message:'أهلا و مرحبا بك في غرفة متحدثي العربية!',sender:"Founder",timestamp:"10:31"}]},
{name:"French",type:"Public",members:null,messages:[{message:'Welcome to the french speaking room.',sender:"Founder",timestamp:"10:32"}]}]);
const[chat,setChat]=useState(null);

return (
    <>
    
        {type === "Public-Messages" ? (
          <>
            <div className="Elements-Wrapper">
              <div className="Elements-Title">
            <h3 style={{ letterSpacing: "-2px", wordSpacing: "-9px" }}>Get a room ?</h3>
            </div>
            <div className="Elements">
              <h5 style={{color:"#00c800"}}>Our Public Lobby:</h5>
            {publicRooms
              ? publicRooms.map((room,roomIndex) => (
                
                  <p key={roomIndex} onClick={()=>setChat(room)}>
                {room.name}
                    <span className="availability-badge"></span>
                  </p>
                ))
              : null}
            </div>
            </div>
            <div className="Display-Wrapper">
              {
              chat? <>
              <h3>{chat.type+" Room "+chat.name}</h3> 
               <Chat chat={chat} setChat={setChat} publicRooms={publicRooms} setPublicRooms={setPublicRooms} />
                </>:null}
            </div>
          </>
        ) : null}
    </>
  );
  
}

   