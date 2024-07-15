import React from 'react';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../authcontext/PrivateRoute';
import Maincomponent from '../joiningForms/componentsWrapper/Maincomponent';
import EmployeeHome from './EmployeeHome';
import EmployeeAbout from './EmployeeAbout';
const EmployeePage = () => {
    return (
        <div style={styles.pageContainer}>
            <NavBar />
            <div style={styles.contentContainer}>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={() => <Maincomponent />} />} />
                    <Route path="/joiningforms" element={<PrivateRoute element={() => <Maincomponent />} />} />
                    <Route path="/homepage" element={<PrivateRoute element={() => <EmployeeHome />} />} />
                    <Route path="/about" element={<PrivateRoute element={() => <EmployeeAbout/>} />} />
                </Routes>
            </div>
        </div>
    );
};
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
    },
    contentContainer:{
        height:'100%',
        overflow:'auto',
    }
};
export default EmployeePage;
