import { useState } from "react"
import { Button } from "./components/ui/button"
function Likes(){
  const [likes,setLikes] = useState(0)
  const handleClick = ()=>{
    setLikes(likes+1)
  }
  return (
   <Button onClick={handleClick} variant="destructive">Likes: {likes}</Button>
  
  )
}
function App() {
 return(
  <Likes></Likes>
 )
}

export default App
