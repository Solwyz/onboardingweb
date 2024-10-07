import logo from './logo.svg';
import './App.css';
import LogedInSection from './Pages/LogedInSection/LogedInSection';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact Component={LogedInSection} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/signup' Component={SignUpPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
