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


function App() {
  return (
    <div className="App font-AnekLatin">
      <Router>
        <Routes>
          <Route path='/hr' Component={LogedInSection} />
          <Route path='/superadmin' Component={SuperAdmin} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/signup' Component={SignUpPage} />
          <Route path='/forgot' Component={ForgotPassword} />
          <Route path='/role' Component={Roles} />
          <Route path='/department' Component={Department} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
