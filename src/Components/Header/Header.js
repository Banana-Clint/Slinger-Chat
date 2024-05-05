import React, { useState} from 'react';
import "./Header.css";
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo.js';
import TextTyper from '../TextTyper/TextTyper.js';

export default function Header({registerClicked,setRegisterClicked} ) {
    const [showButton, setShowButton] = useState(false);
    const fullText = 'Welcome to an unfiltered online chatting Service ! create your account here :';

    const HideParagraph=(Delay)=>{
        setTimeout(()=>{
        let p=document.getElementById('Navbar-List_p')
        if(p){
        return p.style.visibility="hidden"
    }},Delay)
    }

 
    

 

    return (
        <div className="Header-Wrapper">
            <AnimatedLogo/>
            <div className="Navbar" >
                <ul className="Navbar-List">
                    <li>
                        <p id='Navbar-List_p'><TextTyper 
                        TextToType={fullText} 
                        onFinishedTyping={()=>{setShowButton(true); HideParagraph(3000)}}
                        TypeDelay={5800}
                        TypeSpeed={50}/></p>
                    </li>
                    {showButton && (
                        <li>
                            <button className='Navbar-Button' onClick={()=>setRegisterClicked(!registerClicked)}>Register</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
