import { useState } from 'react'
import './App.css'
import Header from "./Components/Header"
import { Route, Router, Routes } from 'react-router-dom';
import Turf from './Components/Turf/Turf.jsx';
import Homepage from './Components/Homepage.jsx';
import Admin from './Components/Admin/Admin.jsx';
import Auth from './Components/Auth/Auth.jsx';

function App() {

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/turf" element={<Turf/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </section>
    </div>
  )
}

export default App;
