import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext/AppContext';
import useFormSubmitHandler from './FormSubmitHandler';
import axios from 'axios';
import validateForm from '../validateForm/ValidateForm';

const AssignRolesForm = () => {
  const { formData, updateFormData, errors, setErrors, setFormData, initialFormData } = useContext(AppContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [buttonName, setButtonName] = useState('update');
  const navigate = useNavigate();

  const handleSubmit = useFormSubmitHandler({
    formData,
    buttonName,
    setSnackbarMessage: (message) => setSnackbar(prev => ({ ...prev, message })),
    setSnackbarSeverity: (severity) => setSnackbar(prev => ({ ...prev, severity })),
    setSnackbarOpen: (open) => setSnackbar(prev => ({ ...prev, open })),
    setFormData,
    initialFormData,
    navigate,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById", { "empId": formData.empId || '*&6' });
        const data = response.data;
        if (data.status === "success") {
          setButtonName('update');
        } else {
          setButtonName('submit');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [formData.empId]);

  useEffect(() => {
    setIsFormValid(validateForm(formData, errors, setSnackbar));
  }, [errors]);

  const handleChange = (field, value) => {
    updateFormData(field, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: !value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prevSnackbar => ({
      ...prevSnackbar,
      open: false
    }));
  };

  return (
    <Container component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>Assign Roles to Employee</Typography>
      <TextField
        label='Employee Id'
        variant="outlined"
        fullWidth
        value={formData.empId || ''}
        sx={{ mb: 2 }}
        onChange={e => handleChange('empId', e.target.value)}
        error={!!errors.empId}
        helperText={errors.empId ? 'Employee Id is required' : ''}
        disabled={buttonName === 'update'}
      />
      <TextField
        label='Employee Name'
        variant="outlined"
        fullWidth
        value={formData.firstName || ''}
        sx={{ mb: 2 }}
        disabled
      />

      <FormControl fullWidth sx={{ mb: 2 }} required error={!!errors.designation}>
        <InputLabel id="designation-label">Designation</InputLabel>
        <Select
          labelId="designation-label"
          id="designation-select"
          value={formData.designation || ''}
          label="Designation"
          onChange={e => handleChange('designation', e.target.value)}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="software engineer">Software Engineer</MenuItem>
          <MenuItem value="sr.software engineer">Sr. Software Engineer</MenuItem>
          <MenuItem value="Team Lead">Team Lead</MenuItem>
          <MenuItem value="projectManager">Project Manager</MenuItem>
          <MenuItem value="DeliveryManager">Delivery Manager</MenuItem>
        </Select>
        {errors.designation && <Typography color="error">Designation is required</Typography>}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} required error={!!errors.reportingTo}>
        <InputLabel id="reportingTo-label">Reporting to</InputLabel>
        <Select
          labelId="reportingTo-label"
          id="reportingTo-select"
          value={formData.reportingTo || ''}
          label="Reporting To"
          onChange={e => handleChange('reportingTo', e.target.value)}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="SEG">SEG Team</MenuItem>
          <MenuItem value="Mobile">Mobile Team</MenuItem>
          <MenuItem value="POC">POC</MenuItem>
        </Select>
        {errors.reportingTo && <Typography color="error">Reporting To is required</Typography>}
      </FormControl>

      <TextField
        label="Responsibilities"
        variant="outlined"
        fullWidth
        value={formData.responsibilities || ''}
        onChange={e => handleChange('responsibilities', e.target.value)}
        error={!!errors.responsibilities}
        helperText={errors.responsibilities ? 'Please enter your responsibilities' : ''}
        sx={{ mb: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
        {buttonName}
      </Button>
      <br />
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
    </Container>
  );
};

export default AssignRolesForm;
