
import"./Room.css"  
// import User from "../User/User.js"
import { useState } from "react"
import Mail from '../Images/Mail Box.png' 
import LobbyImg from '../Images/Lobby.png' 
import Lobby from "../Lobby/Lobby.js"
export default function Room(){


    const [user]=useState("Paul Walker");
    const [lobbyType,setLobbyType]=useState("Public-Messages")



    return(
    <div className="Room-Wrapper">
        <div className="Dashboard-Wrapper">
        <div className="Dashboard">
        <div className="Dashboard-Tools">
   {/* {     <User username={user} />
        <button>+friend+</button>
        <div className="Join-Room">
            <div className="Input-Wrapper">
        <input type= "text" placeholder="ROOM" /> </div>
                    <div className="Buttons-Wrapper"> <button>Join</button> <button id="addRoomButton">+</button></div>
        
            </div>} */}
            <div className="NavButtons-Wrapper"><button onClick={()=>setLobbyType('Direct-Messages')}><img src={Mail}/> <span style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white'
        }}>Mess
             ages
        </span></button>
        <button onClick={()=>setLobbyType("Public-Messages")}><img src={LobbyImg}/> <span style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white'
        }}>Lobby
        </span></button>  </div>
            </div>        
            <div className="Lobby-Wrapper" >
            <Lobby type={lobbyType}/>
            </div>
            </div> 
      
    
        </div>

    </div>
    )
}