import TextTyper from '../TextTyper/TextTyper';
import React, { useEffect, useState } from 'react';
import "./Bubble.css";
const Bubble = () => {
    const [text, setText] = useState(["all men must server !", "Fear not ! young'un !", "My creator needs a Job...",
    "jeez!! somebody died in here?","smells like teen spirit!","cease fire now !"]);
    const [index, setIndex] = useState(0);
    const [startRendering,sestStartRendering]=useState(false)

    useEffect(() => {
        DisplaySelf(11000);
    }, []);

    const DisplaySelf = (Delay) => {
        setTimeout(() => {
            const self = document.getElementById("Bubble");
            self.style.visibility = "visible";
            sestStartRendering(true)
        }, Delay);
    }

    const HideSelf = () => {
        setTimeout(() => {
            const self = document.getElementById("Bubble");
            self.style.visibility = "hidden";
            // Move to the next text after hiding
            setTimeout(() => {  setIndex((prevIndex) => (prevIndex + 1) % text.length);
            // Display the bubble again for the next text
            DisplaySelf(0); }, 3000);
        }, 3000);
    }

    return (
        <div id="Bubble">
            {startRendering && <p><TextTyper
                key={index}
                TextToType={text[index]}
                onFinishedTyping={HideSelf}
                TypeDelay={70}
                TypeSpeed={120} /></p>}
            <div style={{
                width: '0',
                height: '0px',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '15px solid #f63630',
                position: 'absolute',
                bottom: '-19px',
                left: '8%',
                transform: 'translateX(-90%)',
            }} />
        </div>
    );
    
};

export default Bubble;
