import { createContext, useContext, useState } from "react"

interface Task {
    id: string
    name: string
    type: 'pomodoro' | 'short-break' | "long-break"
    completedAt: Date
    duration: number
}

interface TaskContextType {
    tasks: Task[]
    addTask: (task: Omit<Task, 'id'>) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({children}: {children: React.ReactNode}) {
    const [tasks, setTasks] = useState<Task[]>([])
    
    const addTask = (task: Omit<Task,'id'>) => {
        setTasks(prev => [...prev, {...task, id: crypto.randomUUID()}])
    }
    
    const value = {
        tasks,
        addTask
    }
    
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const context = useContext(TaskContext)
    if (context === undefined) {
        throw new Error('useTask must be used within TaskProvider')
    }
    return context
}