import { ThemeProvider } from './components/theme-provider'
import {ThemeToggle} from './components/theme-toggle'
import { CardDemo } from './components/timerCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import Breaks  from './components/breaks'
function App() {
  return (
    <>
 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <Tabs defaultValue='pomodoro' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='pomodoro'>Pomodoro</TabsTrigger>
        <TabsTrigger value='short-break'>Short Break</TabsTrigger>
        <TabsTrigger value='long-break'>Long Break</TabsTrigger>
      </TabsList>
      <TabsContent value='pomodoro'><CardDemo /></TabsContent>
      <TabsContent value='short-break'><Breaks breakTimer={5}/></TabsContent>
      <TabsContent value='long-break'><Breaks breakTimer={15}/></TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  </>
  )
}

export default App
