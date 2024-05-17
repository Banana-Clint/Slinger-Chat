
import "./Room.css"
import { useState } from "react"
import Private from '../Images/logo.png'
import Chat from "../Chat/Chat.js"
import User from "../User/User.js"
import Navigation from "../Navigation/Navigation.js"





const PopUpMenu = ({ isOpen, onClose, onAddRoom,setIsPopUpOpen }) => {
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleAddRoom = () => {
    if (roomName) {
      onAddRoom(roomName);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        display: isOpen ? "block" : "none",
      }}
    >
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={handleRoomNameChange}
        className="popUp"
      />
      <button onClick={handleAddRoom}>Add Room</button><button onClick={()=>setIsPopUpOpen(false)}>x</button>
    </div>
  );
};





export default function Room() {

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [publicRooms, setPublicRooms] = useState([
    {
      name: "En", type: "Public", members: null, image: require("../Images/UK.png"),
      saloons: 
      [{ 
        vocal:
         [{
        name: "Founder's Vocal Saloon", 
        messages: 
        [{ 
        text: 'Hello and welcome to the first vocal saloon.',
        sender: "Founder", 
        timestamp: "10:30"
       }],
        users:[]
      },{
        name: "Founder's Saloon 2", 
        messages: 
        [{ 
        text: 'test Drive founder says Hi',
        sender: "Founder", 
        timestamp: "10:30"
       }],
        users:[]
      }] 
    }],
    owner:"Founder"
    },
  ]);
  
  const [chat, setChat] = useState(null);
  const [view, setView] = useState("");
  const [server,setServer]=useState(null)
  const clickRomm = (room) => {
    setServer(room)
    setChat(null)
    setView("")
  }
  
  const handleAddRoom = (roomName) => {
    // Add the new room to publicRooms state
    setPublicRooms([...publicRooms, { name: roomName,owner:"le me" }]);
  };
  const clickAddRoom=()=>{

  }
  return (
    <div className="Room-Wrapper">
      <div className="Dashboard-Wrapper">
        <div className="Dashboard">
          <div className="Dashboard-Tools">
            <div className="NavButtons-Wrapper">
              <button onClick={() =>{setView("Private")}}>
                <img src={Private} alt="Non" />
              </button>
              <button onClick={() => setIsPopUpOpen(true)}>
                <p style={{ width: "clamp(55px,10vw,40px)", fontSize: "30px", margin: "0" }}>+</p>
              </button>
              <PopUpMenu
        isOpen={isPopUpOpen}
        onClose={() => setIsPopUpOpen(false)}
        onAddRoom={handleAddRoom}
        setIsPopUpOpen={setIsPopUpOpen}
      />
           {publicRooms
  ? publicRooms.map((room, roomIndex) => (
    <button key={roomIndex} onClick={() => clickRomm(room)}>
      <img src={room.image} alt={room.name.slice(0, 5)} />
      <span>{room.name.slice(0, 4)}</span>
    </button>
  ))
  : null}

            </div>
          </div>
          {
            server&&view===""? (
              <div className="Display-Wrapper">
                <>
                  <Navigation room={server} setChat={setChat} />
                  {chat?<Chat chat={chat} setChat={setChat} publicRooms={publicRooms} setPublicRooms={setPublicRooms} />:null}
               
                </>

              </div>
            ) : view === "Private" ? (
              <User />
            ) : (
              <p style={{ color: "white" }}>under construction</p>
            )
          }
        </div>
      </div>

    </div>
  )
}