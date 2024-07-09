import React from 'react';
import { Container, Typography } from '@mui/material';
import NavBar from './NavBar';
import { useAuth } from '../authcontext/AuthContext';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../authcontext/PrivateRoute';
import Maincomponent from '../joiningForms/componentsWrapper/Maincomponent';
import EmployeeHome from './EmployeeHome';

const EmployeePage = () => {
    const { user } = useAuth();
    return (
        <div style={styles.pageContainer}>
            <NavBar />
            <div style={styles.contentContainer}>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={() => <EmployeeHome />} />} />
                    <Route path="/joiningforms" element={<PrivateRoute element={() => <Maincomponent />} />} />
                    <Route path="/homepage" element={<PrivateRoute element={() => <EmployeeHome />} />} />
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
};

export default EmployeePage;
