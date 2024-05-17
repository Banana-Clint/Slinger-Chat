
import "./Navigation.css"



export default function Navigation({room,setChat}){
    console.log(room)

    return(<div className="Navigation-Wrapper">

    
                <select value={room.owner + "'s Room"}>
                    <option id ="Unwanted"disabled value={room.owner + "'s Room"}>{room.owner}'s Room</option>
                   
                </select>


        <div className="Saloon-Wrapper">
            <h6 style={{color:"#00c800"}}>Vocal Saloons:</h6>{
                room&&room.saloons?
               room.saloons.map((saloon)=>{
                   return saloon.vocal.map((type,typeIndex)=>{
                        console.log(type)
                        return(<button key={typeIndex} style={{color:"white",textAlignc:"center"}} onClick={()=>setChat(type)}><em># </em>{type.name}</button>)
                })
                      

            }   ):null
            }
        </div>


    </div>)

}