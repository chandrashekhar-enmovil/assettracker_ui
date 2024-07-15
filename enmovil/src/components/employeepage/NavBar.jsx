import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../authcontext/AuthContext';
import { StyleSheet, TouchableOpacity} from 'react-native';
const NavBar = () => {
    const { logout } = useAuth();
    const [activeButton, setActiveButton] = useState(2);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ENMOVIL
                </Typography>
                <Button
                    color='inherit'
                    component={Link}
                    to='/employee/homepage'
                    onClick={() => handleButtonClick(1)}
                    style={activeButton === 1 ? styles.activeButton : styles.button}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/employee/joiningforms"
                    onClick={() => handleButtonClick(2)}
                    style={activeButton === 2 ? styles.activeButton : styles.button}
                >
                    Add Details
                </Button>
                <Button
                    color='inherit'
                    component={Link}
                    to='/employee/about'
                    onClick={() => handleButtonClick(3)}
                    style={activeButton === 3 ? styles.activeButton : styles.button}
                >
                    About
                </Button>
                <TouchableOpacity onPress={logout}>
                    <LogoutIcon style={styles.icon} />
                </TouchableOpacity>
            </Toolbar>
        </AppBar>
    );
};

const styles = StyleSheet.create({
    button: {
        color: 'black',
        margin: 20,
    },
    activeButton: {
        color: 'white',
        //backgroundColor: '#315ce8',
        margin: 20,
    },
    icon: {
        color: 'black',
        width: 30,
        height: 30,
        margin: 20,
    },
});
export default NavBar;
