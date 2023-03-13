import './css/App.css';
import React, { useState, useMemo } from 'react';
// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';

// Import embedded packages
import { Routes, Route } from "react-router-dom"
 import DashboardBox from './Components/common/DashboardBox';
// Import User Defined packages
import { UserContext } from './Components/UserContext';
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
// import Company from "./Pages/Company"
import ResetPassword from "./Pages/ResetPassword"
// import EditNamePassword from "./Pages/EditNamePassword"
import EditNamePassword from "./Pages/EditNamePassword"
// import Deneme from "./Pages/Deneme"
import Layout from "./Components/layout/Layout"
import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import MenuEditer from './Pages/MenuEditer';
import { CompanyUsers } from './Pages/CompanyUsers';
import AddCompanyInfo from './Pages/AddCompanyInfo';
import Calendar from './Pages/Calendar';
import { Button } from '@mui/material';
// Parse initialization configurations
const PARSE_APPLICATION_ID = 'J2SGA50B8r6DJUqOfhBsILRdVQfZtEMgp2MoqMiR';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'AI7k82dsyU6kAf9fcltcC909m5ZHW1wDqKeKJoPr';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addCompanyInfo" element={<AddCompanyInfo />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/editNamePassword" element={<EditNamePassword />} />
            <Route path="dashboard/*" element={<Dashboard/>}/>
            {/* <DashboardBox>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="menuEditer" element={<MenuEditer />} />
            <Route path="users" element={<CompanyUsers />} />
            <Route path="/calendar" element={<Calendar/>}/>
            </DashboardBox> */}
            {/* <Route path="editNamePassword" element={ <EditNamePassword/> } />
            <Route path="company" element={ <Company/> } />
            <Route path="deneme" element ={<Deneme/>}/> */}
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
