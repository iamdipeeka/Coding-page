import {BrowserRouter} from "react-router-dom"
import { Routes,Route } from "react-router-dom"
import Homescreen from "./screen/homescreen/Index"
import Playground from "./screen/Playground/Index"
import { PlaygroundProvider } from "./Providers/PlaygroundProvider"
import { ModalProvider } from "./Providers/ModalProvider"
import CreatePlaygroundModal from "./Providers/Modals/CreatePlaygroundModal"


function App() {
  

  return (
    <PlaygroundProvider>
      <ModalProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homescreen/>}/>

      <Route path="/Playground" element={<Playground/>}/>

    </Routes>
     
    </BrowserRouter>
    </ModalProvider>
    </PlaygroundProvider>
    
  )
}

export default App