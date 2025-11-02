import './App.css'
import Register from './components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import PatientHome from './pages/PatientHome'
import HPHome from './pages/HPHome'
import ICHome from './pages/ICHome'
import AdminHome from './pages/AdminHome'
import Unauthorized from './pages/Unauthorized'
import Home from './pages/Home'
import UpdatePatientProfile from './pages/UpdatePatientProfile'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/patient-home' element={<PatientHome/>}></Route>
        <Route path='/hp-home' element={<HPHome/>}></Route>
        <Route path='/ic-home' element={<ICHome/>}></Route>
        <Route path='/admin-home' element={<AdminHome/>}></Route>
        <Route path='/unauthorized' element={<Unauthorized/>}></Route>

        <Route path='/update-patient-profile' element={<UpdatePatientProfile/>}></Route>
        
      </Routes>
  )
}

export default App
