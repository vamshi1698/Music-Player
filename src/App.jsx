import NavBar from "./Components/NavBar"
import { useState } from "react"
import "./App.css"
const App = ()=>{
  const [notifyP,setNotifyP] = useState("gg")
  const [showMessage , setShowMessage] = useState(false)
  const handleShowMessage  = (message)=>{
   setNotifyP(message)
   setShowMessage(true)
   setTimeout(()=>{
       setShowMessage(false)
   },2000)
  }
  return(
    <>
    {
       showMessage ? <p className="p" >{notifyP}</p> : ""
    }        
    <NavBar handleShowMessage = {handleShowMessage} />    
    </>
  )
}
export default App ;