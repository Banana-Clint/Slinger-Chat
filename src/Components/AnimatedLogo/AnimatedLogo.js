import React, { useEffect } from 'react';
import './AnimatedLogo.css'; 

export default function AnimatedLogo(){

    useEffect(() => {
        const timer = setTimeout(() => {
          document.getElementsByClassName('Logo-Img')[0].classList.add('zoom-out');
        }, 5800); // Adjust as needed
    
        return () => clearTimeout(timer);
    }, []);
    
    return( 
    <div className="Logo">
    <img 
    src={require("../Images/logo.png")} 
    className="Logo-Img" 
    alt="Logo" />
    </div>
    )

}
