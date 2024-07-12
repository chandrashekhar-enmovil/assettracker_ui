import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextField } from '@mui/material';
import Certifications from '../certification/Certifications';
import AppContext from '../../AppContext/AppContext';
import { CloudUpload, UploadFile } from '@mui/icons-material';
import UploadIcon from '../uploadIconButton/UploadIcon';

const Education = () => {
  const { formData, updateFormData,errors,setErrors} = useContext(AppContext);
  const handleChange = (field, value) => {
    updateFormData(field, value);
    setErrors({
      ...errors,
      [field]: !value,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educational Details</Text>
      <ScrollView>
        <Text style={styles.subtitle}>SSC / 10th</Text>
        <View style={styles.input}>
          <TextField
            label="School"
            variant="outlined"
            value={formData.schoolName}
            style={styles.textField}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            error={errors.schoolName}
            helperText={errors.schoolName ? 'Please enter your school name and location' : ''}
            required
          />
          <TextField
            label="Board"
            variant="outlined"
            value={formData.boardName}
            style={styles.textField}
            onChange={(e) => handleChange('boardName', e.target.value)}
            error={errors.boardName}
            helperText={errors.boardName ? 'Please enter the name of the board' : ''}
            required
          />
          <TextField
            label="Year of Pass"
            variant="outlined"
            value={formData.schoolPass}
            style={styles.textField}
            onChange={(e) => handleChange('schoolPass', e.target.value)}
            error={errors.schoolPass}
            helperText={errors.schoolPass ? 'Please enter the year of passing' : ''}
            required
          />
          <TextField
            label="CGPA/Percentage"
            variant="outlined"
            value={formData.schoolGrade}
            style={styles.textField}
            onChange={(e) => handleChange('schoolGrade', e.target.value)}
            error={errors.schoolGrade}
            helperText={errors.schoolGrade ? 'Please enter your CGPA or percentage' : ''}
            required
          />
          <View style={styles.textField25}>
            <UploadIcon uploadName='tenthFile' description="ssc memo"/>
          </View>
        </View>

        <Text style={styles.subtitle}>INTERMEDIATE/12th</Text>
        <View style={styles.input}>
          <TextField
            label="College"
            variant="outlined"
            value={formData.interName}
            style={styles.textField}
            onChange={(e) => handleChange('interName', e.target.value)}
            error={errors.interName}
            helperText={errors.interName ? 'Please enter your Intermediate college name' : ''}
            required
          />
          <TextField
            label="Board"
            variant="outlined"
            value={formData.interBoard}
            style={styles.textField}
            onChange={(e) => handleChange('interBoard', e.target.value)}
            error={errors.interBoard}
            helperText={errors.interBoard ? 'Please enter the name of the board' : ''}
            required
          />
          <TextField
            label="Pass"
            variant="outlined"
            value={formData.interPass}
            style={styles.textField}
            onChange={(e) => handleChange('interPass', e.target.value)}
            error={errors.interPass}
            helperText={errors.interPass ? 'Please enter the year of passing' : ''}
            required
          />
          <TextField
            label="CGPA/Percentage"
            variant="outlined"
            value={formData.interGrade}
            style={styles.textField}
            onChange={(e) => handleChange('interGrade', e.target.value)}
            error={errors.interGrade}
            helperText={errors.interGrade ? 'Please enter your CGPA or percentage' : ''}
            required
          />
          <View style={styles.textField25}>
            <UploadIcon uploadName='InterFile' description="12th memo"/>
          </View>
        </View>

        <Text style={styles.subtitle}>DEGREE/GRADUATION</Text>
        <View style={styles.input}>
          <TextField
            label="College"
            variant="outlined"
            value={formData.graduationName}
            style={styles.textField}
            onChange={(e) => handleChange('graduationName', e.target.value)}
            error={errors.graduationName}
            helperText={errors.graduationName ? 'Please enter your graduation college name' : ''}
            
          />
          <TextField
            label="Board"
            variant="outlined"
            value={formData.graduationBoard}
            style={styles.textField}
            onChange={(e) => handleChange('graduationBoard', e.target.value)}
            error={errors.graduationBoard}
            helperText={errors.graduationBoard ? 'Please enter the name of the board' : ''}
           
          />
          <TextField
            label="Year of Pass"
            variant="outlined"
            value={formData.graduationPass}
            style={styles.textField}
            onChange={(e) => handleChange('graduationPass', e.target.value)}
            error={errors.graduationPass}
            helperText={errors.graduationPass ? 'Please enter the year of passing' : ''}
          
          />
          <TextField
            label="CGPA/Percentage"
            variant="outlined"
            value={formData.graduationGrade}
            style={styles.textField}
            onChange={(e) => handleChange('graduationGrade', e.target.value)}
            error={errors.graduationGrade}
            helperText={errors.graduationGrade ? 'Please enter your CGPA or percentage' : ''}
  
          />
          <View style={styles.textField25}>
          <UploadIcon uploadName='degreeFile' description="Degree"/>
          </View>
        </View>
        <Text style={styles.subtitle}>POST GRADUATION</Text>
        <View style={styles.input}>
          <TextField
            label="College"
            variant="outlined"
            value={formData.pgName}
            style={styles.textField}
            onChange={(e) => handleChange('pgName', e.target.value)}
            error={errors.pgName}
            helperText={errors.pgName ? 'Please enter your post-graduation college name' : ''}
          />
          <TextField
            label="Board"
            variant="outlined"
            value={formData.pgBoard}
            style={styles.textField}
            onChange={(e) => handleChange('pgBoard', e.target.value)}
            error={errors.pgBoard}
            helperText={errors.pgBoard ? 'Please enter the name of the board' : ''}
          />
          <TextField
            label="Year of Pass"
            variant="outlined"
            value={formData.pgPass}
            style={styles.textField}
            onChange={(e) => handleChange('pgPass', e.target.value)}
            error={errors.pgPass}
            helperText={errors.pgPass ? 'Please enter the year of passing' : ''}
          />
          <TextField
            label="CGPA/Percentage"
            variant="outlined"
            value={formData.pgGrade}
            style={styles.textField}
            onChange={(e) => handleChange('pgGrade', e.target.value)}
            error={errors.pgGrade}
            helperText={errors.pgGrade ? 'Please enter your CGPA or percentage' : ''}
          />
          <View style={styles.textField25}>
          <UploadIcon uploadName='pgFile' description="Pg memo"/>
          </View>
        </View>
        <Certifications />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textField25:{
     marginTop:6,
    width:'15%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  textField: {
    width: '45%',
    margin: 10,
  },
  input: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Education;