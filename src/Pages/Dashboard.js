import '../css/Dashboard.scss';
import 'boxicons/css/boxicons.min.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../Components/layout/AppLayout';
import DashboardBox from '../Components/common/DashboardBox';
import UserProfile from './UserProfile';
import MenuEditer from './MenuEditer';
import { CompanyUsers } from './CompanyUsers';
import Calendar from './Calendar';
import useFetch from './useFetch';
import Settings from './Settings';
import MenuEditerDeneme from '../Pages/MenuEditerDeneme/MenuEditer';
function Dashboard() {
    
    return (
        <DashboardBox>
        <Routes>
        <Route exact path='/' element={<UserProfile />}></Route>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/menuEditDeneme" element={<MenuEditerDeneme />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/menuEditer" element={<MenuEditer />} />
            <Route path="/users" element={<CompanyUsers />} />
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path='/*' element={"Aradığınız Sayfayı Bulamadık :("}></Route>
        </Routes>
        </DashboardBox>
    );
        {/*
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<MenuPreview />} />
                </Route>
            </Routes> */
        }
}

export default Dashboard;
