import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../authcontext/AuthContext';
import { TouchableOpacity } from 'react-native';

const NavBar = () => {
    const {logout}=useAuth();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ENMOVIL 
                </Typography>
                <Button color="inherit" component={Link} to="/maincomponent/joiningforms">EDIT</Button>
                <TouchableOpacity onPress={logout}>
                 <LogoutIcon/>
              </TouchableOpacity>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
