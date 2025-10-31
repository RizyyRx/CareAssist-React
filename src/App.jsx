import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './pages/Home'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
  )
}

export default App
