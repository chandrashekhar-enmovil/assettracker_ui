import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppContext from '../../AppContext/AppContext';
import { Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, Snackbar, Alert, Button } from '@mui/material';
import DocumentUploadForm from './DocumentUploadForm';
import validateForm from '../validateForm/ValidateForm';
import { useAuth } from '../../authcontext/AuthContext';
import useFormSubmitHandler from '../rolemapping/FormSubmitHandler';
import UploadIcon from '../uploadIconButton/UploadIcon';
const BgvCheck = () => {
    const { formData, updateFormData, errors, setFormData, initialFormData } = useContext(AppContext);
    const { user } = useAuth();
    const [isFormValid, setIsFormValid] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });
    const setSnackbarMessage = (message) => setSnackbar(prev => ({ ...prev, message }));
    const setSnackbarSeverity = (severity) => setSnackbar(prev => ({ ...prev, severity }));
    const setSnackbarOpen = (open) => setSnackbar(prev => ({ ...prev, open }));
    const handleSubmit = useFormSubmitHandler({
        formData,
        buttonName: 'submit',
        setSnackbarMessage,
        setSnackbarSeverity,
        setSnackbarOpen,
        setFormData,
        initialFormData
    });

    useEffect(() => {
        const formIsValid = validateForm(formData, errors, setSnackbar);
        setIsFormValid(formIsValid);
    }, [formData, errors]);
    

    const handleCloseSnackbar = () => {
        setSnackbar(prevSnackbar => ({
            ...prevSnackbar,
            open: false
        }));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BGV details</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Have you ever been convicted of a felony or misdemeanor? (Yes/No)</Text>
                <FormControl variant="outlined" fullWidth style={styles.textField50}>
                    <InputLabel>Crime *</InputLabel>
                    <Select
                        value={formData.criminal || 'No'}
                        onChange={(e) => updateFormData('criminal', e.target.value)}
                        label="Crime"
                        required
                    >
                        <MenuItem value="NO">NO</MenuItem>
                        <MenuItem value="YES">Yes</MenuItem>
                    </Select>
                </FormControl>
                {formData.criminal === 'YES' && (
                    <>
                        <Text style={styles.text}>Please fill in these details</Text>
                        <View style={styles.input}>
                            <TextField
                                label="Nature of offence"
                                placeholder="Nature of offence"
                                variant="outlined"
                                value={formData.offence}
                                style={styles.textField}
                                onChange={(e) => updateFormData('offence', e.target.value)}
                            />
                            <TextField
                                label="Date of conviction"
                                type="date"
                                variant="outlined"
                                value={formData.doConviction}
                                style={styles.textField}
                                onChange={(e) => updateFormData('doConviction', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Sentence"
                                variant="outlined"
                                value={formData.sentence}
                                style={styles.textField}
                                onChange={(e) => updateFormData('sentence', e.target.value)}
                            />
                        </View>
                    </>
                )}
                <Container maxWidth="xlg">
                    <Paper elevation={1} sx={{ padding: 3, marginTop: 0 }}>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Declaration For BGV:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="body1" gutterBottom>
                                    I,
                                </Typography>
                                <TextField
                                    variant="standard"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                    placeholder="Enter your name"
                                    sx={{ margin: '0 5px', width: 'auto' }}
                                />
                                <Typography variant="body1" gutterBottom>
                                    , hereby authorize Enmovil Solutions Pvt Ltd and its agents to conduct a comprehensive background check, including but not limited to, verification of educational background, employment history, and criminal record. I understand that the information obtained will be used to determine my suitability for employment and may affect my employment status.
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
                <br/>
                {/* <DocumentUploadForm /> */}
                <UploadIcon uploadName='resume' description='please upload Resume'/>
                <br/>
                <UploadIcon uploadName='offerLetter' description='please upload offerLetter'/>
                <br/>
                <UploadIcon uploadName='relievingLetter' description='please upload Resume'/>
                <br/>
                <UploadIcon uploadName='paySlips' description='please upload payslips'/>
                <br/>
                <UploadIcon uploadName='passportPhoto' description='please upload passportPhoto'/>
                <br />
                {user.role === 'user' && (
                    <Button type="button" variant="contained" color="primary" disabled={!isFormValid} onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </ScrollView>
            {user.role === 'user' && (
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    textField: {
        width: '32%',
        margin: 10,
    },
    textField50: {
        width: '49%',
        margin: 24,
    },
    text: {
        margin: 24,
        marginTop: 0,
        marginBottom: 3,
    },
    input: {
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BgvCheck;
