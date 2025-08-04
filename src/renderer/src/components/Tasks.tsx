import * as React from "react"
import { ScrollArea } from "@renderer/components/ui/scroll-area"
import { Separator } from "@renderer/components/ui/separator"
import { useTask } from "./TaskContext"
import { format } from "date-fns"

export function Tasks() {
  const { tasks } = useTask()

  if (!tasks || tasks.length === 0) {
    return null
  }

  return (
    <ScrollArea className="h-72 w-full rounded-md border max-w-sm">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Task History</h4>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="flex justify-between text-sm">
              <span>{task.name}</span>
              <span className="text-muted-foreground">
                {format(task.completedAt, 'HH:mm')} - {task.type}
              </span>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
