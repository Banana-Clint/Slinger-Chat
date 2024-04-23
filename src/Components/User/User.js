import './User.css';

import Cowboy from '../Images/Cowboy Hat.png' 



export default function User({username}){





    return(
        <div className="User-Wrapper">

        {username?
       <div className='User-Head'> <span><img id='CowboyHat' src={Cowboy} /> {username}</span></div>
        :"Dev Mode"}
        
        <div className='User-Image-Wrapper'>
            <img src={require("../Images/prettypixels.png")} />
        </div>
        </div>
    )


}