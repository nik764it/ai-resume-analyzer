import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/upload" element = {<Upload />}></Route>
        <Route path = "/analysis" element = {<Analysis />}></Route>
      </Routes>
    </BrowserRouter>
  )
}