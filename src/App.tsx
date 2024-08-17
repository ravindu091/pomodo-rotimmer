import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./pages/tasklist";
import Home from "./pages/home";

import './App.css'
export default function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/12' element={<TaskList/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}








