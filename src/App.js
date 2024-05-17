
import Login from './Components/Login/Login.js'
import Room from './Components/Room/Room.js'
import { useState } from 'react'

function App() {
  const [view,setView]=useState("")
  

if (view==="Room"){
  return (<Room/>)
}

  return (
   <>
   <Login  setView={setView}/>
   </>
  );
}

export default App;
