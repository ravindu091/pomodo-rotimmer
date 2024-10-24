import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";

import './App.css'
export default function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
         
        </Routes>
      </BrowserRouter>
      
    </>
  )
}








