import React from 'react';
import {Container, Typography } from '@mui/material';
import NavBar from './NavBar';
import { useAuth } from '../authcontext/AuthContext';
import { Route, Router, Routes } from 'react-router-dom';
import PrivateRoute from '../authcontext/PrivateRoute';
import Maincomponent from '../joiningForms/componentsWrapper/Maincomponent';
const EmployeePage = () => {
    const { user} = useAuth(); 
    console.log(user)
    return (
        <>
            <NavBar />
            <Container>
                <Typography variant="h4" sx={{ my: 3 }}>
                    Hello, {user.email}!
                </Typography>
                <Routes>    
                    <Route path="/joiningforms" element={<PrivateRoute element={() => (
                        <Maincomponent/>
                        )} />}/>
                </Routes>
            </Container>
        </>
    );
};

export default EmployeePage;
