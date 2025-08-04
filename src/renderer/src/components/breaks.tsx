import { Button } from "@renderer/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@renderer/components/ui/card"
import { useState,useEffect } from "react"
import { useTask } from "./TaskContext"

type BreakTimer = 5 | 15
interface Props{
    breakTimer: BreakTimer,
}

const Breaks : React.FC<Props> = ({breakTimer}) => {
  const [timeLeft,setTimeLeft] = useState(breakTimer*60)
  const [isRunning,setIsRunning] = useState(false)
  const [task, setTask] = useState("")
  const { addTask } = useTask()
  useEffect(()=>{
    if(timeLeft === 0 && isRunning){
        setIsRunning(false)
        window.electronAPI.sendNotification(
        'Break Completed!',
        `Time to touch a grass`
      )
        addTask({
        name: task || `${breakTimer} minute break`,
        type: breakTimer === 5 ? 'short-break' : 'long-break',
        completedAt: new Date(),
        duration: breakTimer * 60
        })
    }
    let timer: NodeJS.Timeout
    if(isRunning && timeLeft>0){
      timer = setInterval(()=>{
        setTimeLeft((prevTime)=>prevTime - 1)
      },1000)
    }
    return () => {
      if(timer) clearInterval(timer)
    }
  },[isRunning,timeLeft,breakTimer,task,addTask])

  const toggleTimer = () =>{
    setIsRunning(!isRunning)
  }
  const resetTimer = () =>{
    setIsRunning(false)
    setTimeLeft(breakTimer*60)
  }
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h1 className="text-center">Time for a break!</h1>
          <div className="text-6xl font-bold text-center">
            {formatTime(timeLeft)}
          </div>
      </CardHeader>
      <CardContent>
       <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          onClick={toggleTimer} 
          className="w-full"
          variant={isRunning ? "destructive" : "default"}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        {timeLeft < breakTimer * 60 && !isRunning && (
          <Button 
            onClick={resetTimer} 
            variant="outline" 
            className="w-full"
          >
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
export default Breaks