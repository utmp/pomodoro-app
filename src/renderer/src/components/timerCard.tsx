import { Button } from "@renderer/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@renderer/components/ui/card"
import { Input } from "@renderer/components/ui/input"
import { useState,useEffect } from "react"
import { useTask } from "./TaskContext"
export function CardDemo() {
  const [timeLeft,setTimeLeft] = useState(25*60)
  const [isRunning,setIsRunning] = useState(false)
  const [task,setTask] = useState("")
  const {addTask} = useTask()
  useEffect(()=>{
    let timer: NodeJS.Timeout
    if(timeLeft === 0 && isRunning){
      setIsRunning(false)
      window.electronAPI.sendNotification(
        'Pomodoro Completed!',
        `Compeleted: ${task || 'Pomodoro Session'}`
      )
      addTask({
        name: task || "Pomodoro Session",
        type: "pomodoro",
        completedAt: new Date(),
        duration: 25 * 60 
      })
    }
    if(isRunning && timeLeft>0){
      timer = setInterval(()=>{
        setTimeLeft((prevTime)=>prevTime - 1)
      },1000)
    }
    return () => {
      if(timer) clearInterval(timer)
    }
  },[isRunning,timeLeft,task,addTask])

  const toggleTimer = () =>{
    setIsRunning(!isRunning)
  }
  const resetTimer = () =>{
    setIsRunning(false)
    setTimeLeft(25*60)
  }
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h1 className="text-center">Time to Focus!</h1>
          <div className="text-6xl font-bold text-center">
            {formatTime(timeLeft)}
          </div>
      </CardHeader>
      <CardContent>
       <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="task"
                type="text"
                placeholder="name task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
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
        {timeLeft < 25 * 60 && !isRunning && (
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
