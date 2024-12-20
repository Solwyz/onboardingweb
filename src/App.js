import logo from './logo.svg';
import './App.css';
import LogedInSection from './Pages/LogedInSection/LogedInSection';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

import ForgotPassword from './Pages/LoginPage/ForgotPassword';


import EmployeeInformation from './Components/DashboardComponents/EmployeeInformation/EmployeeInformation';
import SuperAdmin from './Pages/SuperAdmin/SuperAdmin';
import Roles from './Components/SuperAdminComponents/ResourcePoolComponents/Roles/Roles';

import Department from './Components/SuperAdminComponents/ResourcePoolComponents/Department/Department';

import Resource from './Components/SuperAdminComponents/ResourcePoolComponents/Resource/Resource';
import ResourcePoool from './Components/SuperAdminComponents/ResourcePoolComponents/ResourcePool';
import HrTas from './Pages/HrTas/HrTas';
import ProfessionalDetails from './Components/HrTAScomponent/Employee/EmployeeAddForms/ProfessionalDetails';
import ContactDetailsForm from './Components/HrTAScomponent/Employee/EmployeeAddForms/ContactDetailsForm';
import PersonalDetailForm from './Components/HrTAScomponent/Employee/EmployeeAddForms/PersonalDetailForm';
import ScrollToTop from './ScrollToTop';



function App() {
  return (
    <div className="App font-AnekLatin">
      <Router>
      <ScrollToTop />
        <Routes>
          <Route path='/hr' Component={LogedInSection} />
          <Route path='/superadmin' Component={SuperAdmin} />
          <Route path='/hrtas' Component={HrTas} />
          <Route path='/' Component={LoginPage} />
          <Route path='/signup' Component={SignUpPage} />
          <Route path='/forgot' Component={ForgotPassword} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
