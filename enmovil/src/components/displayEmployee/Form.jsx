import React from 'react';
import { Link} from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import ManinHeader from './formModal/MainHeader';

const Form = () => {
    return (
        <>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ padding: 20 }}>
                <Grid container item spacing={2} justifyContent="space-between">
                    <Grid item>
                        <Link to="/app/joiningforms">
                            <Button variant="outlined">
                                Add Employee
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <ManinHeader />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
