import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AppContext from '../../AppContext/AppContext';
const Certifications = () => {
  const { formData, updateFormData,errors,setErrors } = useContext(AppContext);
  if (!formData || !formData.certifications) {
    return <Text>Loading...</Text>;
  }
  const handleAddFields = () => {
    updateFormData('certifications', [
      ...formData.certifications,
      { courseName: '', issuingAuthority: '', tenure: '', certificateDate: '' }
    ]);
  };
  const handleRemoveFields = (index) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
    updateFormData('certifications', updatedCertifications);
  };

  const handleUpdateCertification = (index, key, value) => {
    const updatedCertifications = formData.certifications.map((cert, i) => 
      i === index ? { ...cert, [key]: value } : cert
    );
    updateFormData('certifications', updatedCertifications);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Certifications</Text>
      <ScrollView>
        {formData.certifications.map((cert, idx) => (
          <View key={idx} style={styles.inputGroup}>
            <TextField
              label="Course Name/Certification"
              variant="outlined"
              value={cert.courseName}
              onChange={(e) => handleUpdateCertification(idx, 'courseName', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Issuing Authority"
              variant="outlined"
              value={cert.issuingAuthority}
              onChange={(e) => handleUpdateCertification(idx, 'issuingAuthority', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Tenure"
              variant="outlined"
              value={cert.tenure}
              onChange={(e) => handleUpdateCertification(idx, 'tenure', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Date of Certificate"
              variant="outlined"
              value={cert.certificateDate}
              onChange={(e) => handleUpdateCertification(idx, 'certificateDate', e.target.value)}
              style={styles.textField}
            />
            <TouchableOpacity onPress={() => handleRemoveFields(idx)}>
              <RemoveCircleIcon />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={handleAddFields} style={styles.addButton}>
          <AddCircleOutlineIcon />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  addButton: {
    margin: 20,
    marginTop: 10,
  },
});

export default Certifications;
