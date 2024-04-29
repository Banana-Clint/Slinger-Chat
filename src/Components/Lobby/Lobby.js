import { useState } from "react"
import "./Lobby.css"
import Chat from "../Chat/Chat"




export default function Lobby ({type}){

const[elements,setElements]=useState(["Room1","Room2","Roomd","Rooms","Roomv","Roomq"])

if (type==="Public-Messages"){
    return(
        
        <>  
             
         <div className="Elements-Wrapper"> 
         <h3 style={{letterSpacing:"-2px",wordSpacing:"-9px"}}>Get a room</h3>  
        {elements?elements.map((element)=>{return<p key={element}> <span className="availability-badge"></span>{element} </p>}
         ):null}
        </div>
        <div className="Display-Wrapper">
         <Chat/>
        </div>
        </>    

)}
    else{
        return("sorry not yet test toggle purpose")
    }
}