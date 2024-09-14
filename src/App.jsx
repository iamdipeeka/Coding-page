import {BrowserRouter} from "react-router-dom"
import { Routes,Route } from "react-router-dom"
import Homescreen from "./screen/homescreen/Index"
import Playground from "./screen/Playground/Index"
import { PlaygroundProvider } from "./Providers/PlaygroundProvider"

function App() {
  

  return (
    <PlaygroundProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homescreen/>}/>

      <Route path="/Playground" element={<Playground/>}/>

    </Routes>
     
    </BrowserRouter>
    </PlaygroundProvider>
  )
}

export default App