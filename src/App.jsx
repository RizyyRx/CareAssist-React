import './App.css'
import AdminRegister from './components/AdminRegister'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import PatientHome from './pages/PatientHome'
import HPHome from './pages/HPHome'
import ICHome from './pages/ICHome'
import AdminHome from './pages/AdminHome'
import Unauthorized from './pages/Unauthorized'
import Home from './pages/Home'
import UpdatePatientProfile from './pages/UpdatePatientProfile'
import CreateInsurancePlan from './pages/CreateInsurancePlan'
import ProtectedRoute from './components/ProtectedRoute'
import PatientMaster from './pages/PatientMaster'
import ICMaster from './pages/ICMaster'
import HPMaster from './pages/HPMaster'
import AdminMaster from './pages/AdminMaster'
import Logout from './components/Logout'
import SelectInsurancePlan from './pages/SelectInsurancePlan'
import CreateInvoice from './pages/CreateInvoice'
import CurrentInvoices from './pages/CurrentInvoices'
import SubmitClaim from './pages/SubmitClaim'
import AllClaims from './pages/AllClaims'
import CurrentPayments from './pages/CurrentPayments'
import ProcessPayment from './pages/ProcessPayment'
import ManageAccounts from './pages/ManageAccounts'
import PatientRegister from './components/PatientRegister'
import NotFound from './components/NotFound'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/patient-register' element={<PatientRegister/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>


        <Route path='/patient' element={<ProtectedRoute allowedRole="ROLE_PATIENT"> <PatientMaster/> </ProtectedRoute>}>
          <Route index element={<Navigate to="patient-home" replace />} />
          <Route path='patient-home' element={<PatientHome/>}/>
          <Route path='update-patient-profile' element={<UpdatePatientProfile/>}/>
          <Route path='select-insurance-plan' element={<SelectInsurancePlan/>}/>
          <Route path='current-invoices' element={<CurrentInvoices/>}/>
          <Route path='submit-claim' element={<SubmitClaim/>}/>
          <Route path='current-payments' element={<CurrentPayments/>}/>
        </Route>

        <Route path='/ic' element={<ProtectedRoute allowedRole="ROLE_INSURANCE_COMPANY"> <ICMaster/> </ProtectedRoute>}>
          <Route index element={<Navigate to="ic-home" replace />} />
          <Route path='ic-home' element={<ICHome/>}/>
          <Route path='create-insurance-plan' element={<CreateInsurancePlan/>}/>
          <Route path='all-claims' element={<AllClaims/>}/>
          <Route path='process-payment' element={<ProcessPayment/>}/>
        </Route>

        <Route path='/hp' element={<ProtectedRoute allowedRole="ROLE_HEALTHCARE_PROVIDER"> <HPMaster/> </ProtectedRoute>}>
          <Route index element={<Navigate to="hp-home" replace />} />
          <Route path='hp-home' element={<HPHome/>}/>
          <Route path='create-invoice' element={<CreateInvoice/>}/>
        </Route>
        
        <Route path='/admin' element={<ProtectedRoute allowedRole="ROLE_ADMIN"> <AdminMaster/> </ProtectedRoute>}>
          <Route index element={<Navigate to="admin-home" replace />} />
          <Route path='admin-home' element={<AdminHome/>}/>
          <Route path='manage-accounts' element={<ManageAccounts/>}/>
          <Route path='admin-register' element={<AdminRegister/>}/>
        </Route>

        <Route path='/unauthorized' element={<Unauthorized/>}></Route>
        
        <Route path="*" element={<NotFound/>} />
      </Routes>
  )
}

export default App
