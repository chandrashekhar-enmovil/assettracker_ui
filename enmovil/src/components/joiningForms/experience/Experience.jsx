import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextField, Autocomplete, Chip,FormControl, MenuItem,InputLabel,Select  } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AppContext from '../../AppContext/AppContext';
import { Switch,FormControlLabel} from '@mui/material';
import SkillsGrid from './SkillsGrid'

const Experience = () => {
  const { formData, updateFormData } = useContext(AppContext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [role,setRole]=useState('Experienced');
  const [checked, setChecked] = useState(true);
  const handleSkillsChange = (event, value) => {
    setSelectedSkills(value);
    updateFormData('skills', value);
  };
  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToDelete);
    setSelectedSkills(updatedSkills);
    updateFormData('skills', updatedSkills);
  };
  const handleAddFields = () => {
    updateFormData('experience', [
      ...formData.experience,
      { companyName: '', designation: '', department: '', tenure: '' },
    ]);
  };

  const handleRemoveFields = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    updateFormData('experience', updatedExperience);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setRole(prev => prev === 'Experienced' ? 'Fresher' : 'Experienced');
  };
  const handleUpdateExperience = (index, key, value) => {
    const updatedExperience = formData.experience.map((exp, i) =>
      i === index ? { ...exp, [key]: value } : exp
    );
    updateFormData('experience', updatedExperience);
  };

  if (!formData || !formData.experience) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{role} & Skills Details</Text>
      </View>
        <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label={role}
          />
      <ScrollView showsVerticalScrollIndicator={false}>
        <br/>
      <FormControl variant="outlined" fullWidth style={styles.textField50}>
            <InputLabel>Total experience in Years</InputLabel>
            <Select
              value={formData.yearsOfExperience || "0-1" }
              onChange={(e) =>  updateFormData('yearsOfExperience', e.target.value)}
              label="Total experience in Years"
              // InputLabelProps={{ shrink: false }}
              required
            >
              <MenuItem><em>None</em></MenuItem> 
              <MenuItem value="0-1">0-1</MenuItem>
              <MenuItem value="1-2">1-2</MenuItem>
              <MenuItem value="2-3">2-3</MenuItem>
              <MenuItem value="4-5">4-5</MenuItem>
              <MenuItem value="5+">5+</MenuItem>
            </Select>
          </FormControl>
       {checked && <>
        {formData.experience.map((exp, idx) => (
          <View key={idx} style={styles.inputGroup}>
            <TextField
              label="Company Name"
              variant="standard"
              value={exp.companyName}
              onChange={(e) => handleUpdateExperience(idx, 'companyName', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Designation"
              variant="standard"
              value={exp.designation}
              onChange={(e) => handleUpdateExperience(idx, 'designation', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Department"
              variant="standard"
              value={exp.department}
              onChange={(e) => handleUpdateExperience(idx, 'department', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Tenure"
              variant="standard"
              value={exp.tenure}
              onChange={(e) => handleUpdateExperience(idx, 'tenure', e.target.value)}
              style={styles.textField}
            />
            <TextField
              label="Supervisor Name"
              variant="standard"
              value={exp.supervisorName}
              onChange={(e) => handleUpdateExperience(idx, 'supervisorName', e.target.value||'')}
              style={styles.textField}
            />
            <TextField
              label="Contact Information"
              variant="standard"
              value={exp.supervisorInfo}
              onChange={(e) => handleUpdateExperience(idx, 'supervisorInfo', e.target.value||'')}
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
        </>}
        <SkillsGrid/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  textField50: {
    margin: 20,
    width: '50%',
  },
  buttonSubmit: {
    height: 30,
    margin: 20,
    marginTop: 25,
  },
});
export default Experience;
