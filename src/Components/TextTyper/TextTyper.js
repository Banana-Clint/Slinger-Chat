import { useState,useEffect } from "react";





export default function TextTyper({TextToType, onFinishedTyping, TypeDelay, TypeSpeed}) {
    const [text,setText]=useState("");
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setStart(true);
        }, TypeDelay); 
        return () => clearTimeout(timeoutId);
    }, []);
    
    useEffect(() => {
        if (start) {
            const intervalId = setInterval(() => {
                if (index < TextToType.length) {
                    setText((prevText) => prevText + TextToType.charAt(index));
                    setIndex(index + 1);
                } else {
                    clearInterval(intervalId);
                    if (onFinishedTyping) {
                        onFinishedTyping();
                    }
                }
            }, TypeSpeed); // Adjust speed as needed
            return () => clearInterval(intervalId);
        }
    }, [index, start]);

    return (
        <>
            {text}
        </>
    );
}
