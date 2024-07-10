import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../authcontext/AuthContext';
import { Container, Typography } from '@mui/material';

const EmployeeHome = () => {
    const { user} = useAuth();
  return (
    <View>
        <Container>
                 <Typography variant="h4" sx={{ my: 9 }}>
                     Hello, {user.email}!
                 </Typography>
             </Container>
    </View>
  )
}

export default EmployeeHome
