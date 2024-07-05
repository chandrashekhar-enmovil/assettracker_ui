import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import AppContext from '../../AppContext/AppContext';
import { Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, } from '@mui/material';
import DocumentUploadForm from './DocumentUploadForm';
const BgvCheck = () => {
    const { formData, updateFormData,errors, setErrors,setFormData} = useContext(AppContext);
    useEffect(()=>{
        console.log(formData.criminal,formData,errors)
    },[formData.criminal])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BGV details</Text>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Text style={styles.text}>Have you ever been convicted of a felony or misdemeanor?(Yes/No)</Text>
        <FormControl variant="outlined" fullWidth style={styles.textField50}>
            <InputLabel>crime *</InputLabel> 
            <Select
              value={formData.criminal || 'NO'}
              onChange={(e) => updateFormData('criminal', e.target.value)}
              label="crime"
              error={errors.criminal}
              helperText={errors.criminal ? 'please select':''}
              required
            >
              <MenuItem value="NO">NO</MenuItem>
              <MenuItem value="YES">Yes</MenuItem>
            </Select>
          </FormControl>
            { formData.criminal ==='YES' &&   (<>
            <Text style={styles.text}>Please fill this details </Text>
            <View style={styles.input}>				
                <TextField 
                    label='nature of offence'
                    placeholder="Have you ever been convicted of a felony or misdemeanor?(Yes/No)" 
                    variant="outlined" 
                    value={formData.offence} 
                    style={styles.textField} 
                    onChange={(e) => updateFormData('offence', e.target.value)}
                    // error={errors.offence}
                    // helperText={errors.firstName ? 'Please enter your first name' : ''}
                    required
                />
                <TextField 
                    label='Date of conviction'
                    //placeholder="Have you ever been convicted of a felony or misdemeanor?(Yes/No)" 
                    type='date'
                    variant="outlined" 
                    value={formData.doConviction} 
                    style={styles.textField} 
                    onChange={(e) => updateFormData('doConviction', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    // error={errors.offence}
                    // helperText={errors.firstName ? 'Please enter your first name' : ''}
                    required
                />
                <TextField 
                    label='sentence' 
                    variant="outlined" 
                    value={formData.sentence} 
                    style={styles.textField} 
                    onChange={(e) => updateFormData('sentence', e.target.value)}
                    required
                />
             </View>
        </>)}
        <Container maxWidth="xlg" >
      <Paper elevation={1} sx={{ padding:3, marginTop: 0}}>
        <Box
          component="form"
        //   onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
          Declaration For BGV: 
          </Typography>
          <Typography variant="body1" gutterBottom >
            I, <TextField
                variant="standard"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName',e.target.value)}
                placeholder="Enter your name"
                sx={{ margin: '0 5px', width: 'auto' }}
              />, hereby authorize Enmovil Solutions Pvt Ltd and its agents to conduct a comprehensive background check, including but not limited to, verification of educational background, employment history, and criminal record. I understand that the information obtained will be used to determine my suitability for employment and may affect my employment status.
          </Typography>
        </Box>
      </Paper>
    </Container>
    <DocumentUploadForm/>
        </ScrollView>

        
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
    marginTop:0,
    marginBottom:3,
},
  input: {
      width: '100%',
      marginLeft:10,
      marginRight:10,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  button: {
      height: 40,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50', /* Green */
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

export default BgvCheck
