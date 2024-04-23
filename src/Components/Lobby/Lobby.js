import { useState } from "react"
import "./Lobby.css"
import Chat from "../Chat/Chat"




export default function Lobby ({type}){

const[elements,setElements]=useState(["Room1","Room2","Roomd","Rooms","Roomv","Roomq"])

if (type=="Public-Messages"){
    return(
        
        <>  
            <h1>Under construction</h1>
         <div className="Elements-Wrapper"> 
        <ul >
        {elements?elements.map((element)=>{return<li  key={element}> {element} </li>}
         ):null}
         </ul>
        </div>
        <div className="Display-Wrapper">
         <Chat/>
        </div></>    

)}
    else{
        return("sorry not yet test toggle purpose")
    }
}