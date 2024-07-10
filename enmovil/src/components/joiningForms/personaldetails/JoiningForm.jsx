import React, { useContext, useState } from 'react';
import { View, Text, ScrollView} from 'react-native';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import AppContext from '../../AppContext/AppContext';
import { StyleSheet } from 'react-native';
import { CloudUpload } from '@mui/icons-material';
const JoiningForm = () => {
  const [emailError, setEmailError] = useState(false);  
  const { formData, updateFormData,errors, setErrors} = useContext(AppContext);
  const handleChange = (field, value) => {
    updateFormData(field, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: !value,
    }));
  };
  const handlePhoneChange = (field,number) => {
    const isValid = /^[6789]\d{9}$/.test(number);
    updateFormData(field, number);
    setErrors({
      ...errors,
      [field]: !isValid,
    });
  };
  const handleEmailChange = (event) => {
    const email = event.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    updateFormData('email', email);
    setEmailError(!isValidEmail);
    setErrors(prevErrors => ({
      ...prevErrors,
      'email': !isValidEmail,
    }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal details</Text>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.input}>
          <TextField 
          label='Name'
            placeholder="Name as per Aadhar" 
            variant="outlined" 
            value={formData.firstName} 
            style={styles.textField} 
            onChange={(e) => handleChange('firstName', e.target.value)} 
            error={errors.firstName}
            helperText={errors.firstName ? 'Please enter your first name' : ''}
            required
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Father's Name" 
            variant="outlined" 
            value={formData.fatherName} 
            style={styles.textField} 
            onChange={(e) => handleChange('fatherName', e.target.value)} 
          />
          <TextField 
            label="Father's Occupation" 
            variant="outlined" 
            value={formData.fatherOccupation} 
            style={styles.textField} 
            onChange={(e) => handleChange('fatherOccupation', e.target.value)} 
          />
          <TextField 
            label="Father's Birth Date" 
            type="date" 
            variant="outlined" 
            value={formData.fatherBirthDate} 
            style={styles.textField} 
            InputLabelProps={{ shrink: true }} 
            onChange={(e) => handleChange('fatherBirthDate', e.target.value)} 
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Mother's Name" 
            variant="outlined" 
            value={formData.motherName} 
            style={styles.textField} 
            onChange={(e) => handleChange('motherName', e.target.value)} 
          />
          <TextField 
            label="Mother's Occupation" 
            variant="outlined" 
            value={formData.motherOccupation} 
            style={styles.textField} 
            onChange={(e) => handleChange('motherOccupation', e.target.value)} 
          />
          <TextField 
            label="Mother's Birth Date" 
            type="date" 
            variant="outlined" 
            value={formData.motherBirthDate} 
            style={styles.textField} 
            InputLabelProps={{ shrink: true }} 
            onChange={(e) => handleChange('motherBirthDate', e.target.value)} 
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Address" 
            variant="outlined" 
            value={formData.address} 
            style={styles.textField} 
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address} 
            helperText={errors.address ? 'Please enter your address' : ''}
            required
          />
          <TextField 
            label="City" 
            variant="outlined" 
            value={formData.city} 
            style={styles.textField} 
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city} 
            helperText={errors.city ? 'Please enter your city' : ''}
            required
          />
          <TextField 
            label="State" 
            variant="outlined" 
            value={formData.state} 
            style={styles.textField} 
            onChange={(e) => handleChange('state', e.target.value)}
            error={errors.state} 
            helperText={errors.state ? 'Please enter your state' : ''}
            required
          />
          <TextField 
            label="Zipcode" 
            variant="outlined"
            type="number" 
            value={formData.zipCode} 
            style={styles.textField} 
            onChange={(e) => handleChange('zipCode', e.target.value)}
            error={errors.zipCode} 
            helperText={errors.zipCode ? 'Please enter your zipcode' : ''}
            required
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Phone Number(Home)" 
            variant="outlined" 
            value={formData.phHome} 
            type="number"
            style={styles.textField50} 
            onChange={(e) => handlePhoneChange('phHome', e.target.value)}
            error={errors.phHome} 
            helperText={errors.phHome ? 'Please enter your home number' : ''}
          />
          <TextField 
            label="Personal Number" 
            variant="outlined" 
            value={formData.phonePersonal} 
            style={styles.textField50} 
            //type="number"
            onChange={(e) => handlePhoneChange('phonePersonal', e.target.value)}
            error={errors.phonePersonal} 
            helperText={errors.phonePersonal ? 'Please enter your  number' : ''} 
            required
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Email" 
            variant="outlined" 
            type="email" 
            value={formData.email} 
            onChange={handleEmailChange}
            style={styles.textField50}
            error={errors.email}
            helperText={errors.email ? 'Please enter a valid email address' : ''} 
          />
          <TextField 
            label="Alternative Number" 
            variant="outlined" 
            value={formData.alternative} 
            style={styles.textField50} 
            onChange={(e) => handlePhoneChange('alternative', e.target.value)} 
            error={errors.alternative} 
            helperText={errors.alternative ? 'Please enter your alternative number' : ''} 
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Date of Birth" 
            type="date" 
            variant="outlined" 
            value={formData.birthDate} 
            style={styles.textField} 
            InputLabelProps={{ shrink: true }} 
            onChange={(e) => handleChange('birthDate', e.target.value)}
            error={errors.birthDate} 
            helperText={errors.birthDate ? 'Please enter your date of birth' : ''}
            required
          />
          <TextField 
            label="Age" 
            variant="outlined" 
            value={formData.age} 
            style={styles.textField50} 
            onChange={(e) => handleChange('age', e.target.value)}
            error={errors.age} 
            helperText={errors.age ? 'Please enter your age' : ''}
            required
          />
          <FormControl variant="outlined" fullWidth style={styles.textField50}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth style={styles.textField50}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              value={formData.maritalStatus}
              onChange={(e) => handleChange('maritalStatus', e.target.value)}
              label="Marital Status"
              required
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
            </Select>
          </FormControl>
        </View>
        <View style={styles.input}>
          <TextField 
            label="Aadhar Number" 
            variant="outlined" 
            value={formData.aadhar} 
            style={styles.textField50} 
            onChange={(e) => handleChange('aadhar', e.target.value)}
            error={errors.aadhar} 
            helperText={errors.aadhar ? 'Please enter your Aadhar number' : ''}
            required
          />
          <TextField 
            label="PAN Number" 
            variant="outlined" 
            value={formData.pan} 
            style={styles.textField50} 
            onChange={(e) => handleChange('pan', e.target.value)}
            error={errors.pan} 
            helperText={errors.pan ? 'Please enter your PAN number' : ''}
            required
          />
        </View>
        <View style={styles.uploadContainer100}>
          <View style={styles.uploadContainer}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-aadhar"
              type="file"
              onChange={(e) => handleChange('aadharFile', e.target.files[0])}
            />
            <label htmlFor="upload-aadhar" style={styles.uploadLabel}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={styles.uploadButton}
                startIcon={<CloudUpload />}
              >
                Upload Aadhar File
              </Button>
            </label>
            {formData.aadharFile &&<Text>{formData.aadharFile.name}</Text>}
          </View>
          <View style={styles.uploadContainer}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-pan"
              type="file"
              onChange={(e) => handleChange('panFile', e.target.files[0])}
            />
            <label htmlFor="upload-pan" style={styles.uploadLabel}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={styles.uploadButton}
                startIcon={<CloudUpload />}
              >
                Upload PAN File
              </Button>
            </label>
            {formData.panFile && <Text>{formData.panFile.name}</Text>}
          </View>
        </View> 
        <View style={styles.input}>
          <TextField 
            label="UAN Number" 
            variant="outlined" 
            value={formData.uan} 
            style={styles.textField50} 
            onChange={(e) => handleChange('uan', e.target.value)}
            error={errors.uan} 
            helperText={errors.uan ? 'Please enter your UAN number' : ''}
          />
          <TextField 
            label="ESI Number" 
            variant="outlined" 
            value={formData.esi} 
            style={styles.textField50} 
            onChange={(e) => handleChange('esi', e.target.value)} 
          />
        </View>
        <View style={styles.input}>
          <TextField 
            label="Bank Name" 
            variant="outlined" 
            value={formData.bank} 
            style={styles.textField} 
            onChange={(e) => handleChange('bank', e.target.value)}
            error={errors.bank} 
            helperText={errors.bank ? 'Please enter your bank name' : ''} 
            required
          />
          <TextField 
            label="Account Number" 
            variant="outlined" 
            value={formData.account} 
            style={styles.textField} 
            onChange={(e) => handleChange('account', e.target.value)}
            error={errors.account} 
            helperText={errors.account ? 'Please enter your account number' : ''}
            required
          />
          <TextField 
            label="IFSC" 
            variant="outlined" 
            value={formData.ifsc} 
            style={styles.textField} 
            onChange={(e) => handleChange('ifsc', e.target.value)}
            error={errors.ifsc} 
            helperText={errors.ifsc ? 'Please enter your IFSC code' : ''} 
            required
          />
        </View>
        <View style={styles.uploadContainer100}>
          <View style={styles.uploadContainer}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-passBook"
              type="file"
              onChange={(e) => handleChange('passBook', e.target.files[0])}
            />
            <label htmlFor="upload-passBook" style={styles.uploadLabel}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={styles.uploadButton}
                startIcon={<CloudUpload />}
              >
                passBook
              </Button>
            </label>
            {formData.passBook &&<Text>{formData.passBook.name}</Text>}
          </View>
          <View style={styles.uploadContainer}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-chequeBook"
              type="file"
              onChange={(e) => handleChange('chequeBook', e.target.files[0])}
            />
            <label htmlFor="upload-chequeBook" style={styles.uploadLabel}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                style={styles.uploadButton}
                startIcon={<CloudUpload />}
              >
                chequeBook
              </Button>
            </label>
            {formData.chequeBook && <Text>{formData.chequeBook.name}</Text>}
          </View>
        </View>
        {formData.maritalStatus === 'married' && (
          <>
            <Text style={styles.title}>If married, please fill the following details</Text>
            <View style={styles.input}>
              <TextField
                label="Spouse Name"
                variant="outlined"
                value={formData.spouse}
                style={styles.textField}
                onChange={(e) => handleChange('spouse', e.target.value)}
                error={errors.spouse} 
                helperText={errors.spouse ? 'Please enter your spouse' : ''}
              />
              <TextField
                label="Spouse Birth Date"
                type="date"
                variant="outlined"
                value={formData.spouseBirthDate}
                style={styles.textField}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange('spouseBirthDate', e.target.value)}
              />
              <TextField
                label="Spouse Age"
                variant="outlined"
                value={formData.spouseAge}
                style={styles.textField}
                onChange={(e) => handleChange('spouseAge', e.target.value)}
              />
              <TextField
                label="Spouse Gender"
                variant="outlined"
                value={formData.spouseGender}
                style={styles.textField}
                onChange={(e) => handleChange('spouseGender', e.target.value)}
              />
            </View>
            <View style={styles.input}>
              <TextField
                label="Child 1 Name"
                variant="outlined"
                value={formData.children1}
                style={styles.textField}
                onChange={(e) => handleChange('children1', e.target.value)}
              />
              <TextField
                label="Child 1 Birth Date"
                type="date"
                variant="outlined"
                value={formData.childrenDob1}
                style={styles.textField}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange('childrenDob1', e.target.value)}
              />
              <TextField
                label="Child 1 Age"
                variant="outlined"
                value={formData.childrenAge1}
                style={styles.textField}
                onChange={(e) => handleChange('childrenAge1', e.target.value)}
              />
              <TextField
                label="Child 1 Gender"
                variant="outlined"
                value={formData.childrenGender1}
                style={styles.textField}
                onChange={(e) => handleChange('childrenGender1', e.target.value)}
              />
            </View>
            <View style={styles.input}>
              <TextField
                label="Child 2 Name"
                variant="outlined"
                value={formData.children2}
                style={styles.textField}
                onChange={(e) => handleChange('children2', e.target.value)}
              />
              <TextField
                label="Child 2 Birth Date"
                type="date"
                variant="outlined"
                value={formData.childrenDob2}
                style={styles.textField}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange('childrenDob2', e.target.value)}
              />
              <TextField
                label="Child 2 Age"
                variant="outlined"
                value={formData.childrenAge2}
                style={styles.textField}
                onChange={(e) => handleChange('childrenAge2', e.target.value)}
              />
              <TextField
                label="Child 2 Gender"
                variant="outlined"
                value={formData.childrenGender2}
                style={styles.textField}
                onChange={(e) => handleChange('childrenGender2', e.target.value)}
              />
            </View>
          </>
        )}
      </ScrollView>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  uploadContainer: {
    width: '49%',
    //alignItems: 'center',
    paddingBottom:10,
    paddingTop:10,
  },
  uploadContainer100:{
    width: '98%',
    margin:10,
    flexDirection:'row',
    justifyContent:'space-between'
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
      margin: 10,
  },
  input: {
      width: '100%',
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

export default JoiningForm;