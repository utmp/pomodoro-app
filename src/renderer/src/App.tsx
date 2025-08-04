import { ThemeProvider } from './components/theme-provider'
import {ThemeToggle} from './components/theme-toggle'
import { CardDemo } from './components/timerCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

function App() {
  return (
    <>
 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <ThemeToggle />
        <Tabs defaultValue='pomodoro' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='pomodoro'>Pomodoro</TabsTrigger>
        <TabsTrigger value='short-break'>Short Break</TabsTrigger>
      </TabsList>
      <TabsContent value='pomodoro'><CardDemo /></TabsContent>
      <TabsContent value='short-break'>short break</TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  </>
  )
}

export default App
