import {BrowserRouter} from "react-router-dom"
import { Routes,Route } from "react-router-dom"
import Homescreen from "./screen/homescreen/Index"
import Playground from "./screen/Playground/Index"

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homescreen/>}/>

      <Route path="/Playground" element={<Playground/>}/>

    </Routes>
     
    </BrowserRouter>
  )
}

export default App
