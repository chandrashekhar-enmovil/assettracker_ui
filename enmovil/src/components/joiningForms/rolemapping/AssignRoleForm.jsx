// import React, { useContext, useState, useEffect } from 'react';
// import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
// import AppContext from '../../AppContext/AppContext';
// import axios from 'axios';

// const AssignRolesForm = () => {
//   const { formData, updateFormData, errors, setErrors } = useContext(AppContext);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   useEffect(() => {
//     const validateForm = () => {
//       for (let key in errors) {
//         if (formData[key] === '') {
//           return false;
//         }
//       }
//       return true;
//     };

//     setIsFormValid(validateForm());
//   }, [formData, errors]);

//   const handleChange = (field, value) => {
//     updateFormData(field, value);
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [field]: !value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) {
//       return;
//     }
//     try {
//       const response = await axios.post('http://216.48.185.128:3001/assetEmp/empRegister', formData);
//       console.log('Response:', response.data);
//       setSuccessMessage('Data successfully Added!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setSuccessMessage('Data not Added!');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>Assign Roles to Employee</Typography>
//       <TextField
//         label='Employee Id'
//         variant="outlined"
//         fullWidth
//         value={formData.empId}
//         sx={{ mb: 2 }}
//         onChange={e => handleChange('empId', e.target.value)}
//         error={!!errors.empId}
//         helperText={errors.empId ? 'Employee Id is required' : ''}
//         disabled={false}
//       />
//       <TextField
//         label='Employee Name'
//         variant="outlined"
//         fullWidth
//         value={formData.firstName}
//         sx={{ mb: 2 }}
//         disabled={true}
//       />

//       <FormControl fullWidth sx={{ mb: 2 }} required>
//         <InputLabel id="role-label">Designation</InputLabel>
//         <Select
//           labelId="role-label"
//           id="role-select"
//           value={formData.designation}
//           label="Designation"
//           onChange={e => handleChange('designation', e.target.value)}
//           error={!!errors.designation}
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           <MenuItem value="software engineer">Software Engineer</MenuItem>
//           <MenuItem value="sr.software engineer">Sr. Software Engineer</MenuItem>
//           <MenuItem value="Team Lead">Team Lead</MenuItem>
//           <MenuItem value="projectManager">Project Manager</MenuItem>
//           <MenuItem value="DeliveryManager">Delivery Manager</MenuItem>
//         </Select>
//         {errors.designation && <Typography color="error">Designation is required</Typography>}
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }} required>
//         <InputLabel id="role-label">Reporting to</InputLabel>
//         <Select
//           labelId="role-label"
//           id="role-select"
//           value={formData.reportingTo}
//           label="Reporting To"
//           onChange={e => handleChange('reportingTo', e.target.value)}
//           error={!!errors.reportingTo}
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           <MenuItem value="SEG">SEG Team</MenuItem>
//           <MenuItem value="Mobile">Mobile Team</MenuItem>
//           <MenuItem value="POC">POC</MenuItem>
//         </Select>
//         {errors.reportingTo && <Typography color="error">Reporting To is required</Typography>}
//       </FormControl>

//       <TextField
//         label="Responsibilities"
//         variant="outlined"
//         fullWidth
//         value={formData.responsibilities}
//         onChange={e => handleChange('responsibilities', e.target.value)}
//         error={!!errors.responsibilities}
//         helperText={errors.responsibilities ? 'Please enter your responsibilities' : ''}
//         sx={{ mb: 2 }}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
//         Submit
//       </Button>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {successMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AssignRolesForm;

import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import AppContext from '../../AppContext/AppContext';
import axios from 'axios';

const AssignRolesForm = () => {
  const { formData, updateFormData, errors, setErrors } = useContext(AppContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('submit');
  const [buttonName, setButtonName] = useState('update');
  const [url, setUrl] = useState("http://216.48.185.128:3001/assetEmp/empRegister");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById",{"empId":formData.empId});
        const data = response.data;
        console.log(data)
        if (data.status === "success") {
          setButtonName('update');
          setUrl('http://216.48.185.128:3001/assetEmp/editEmployeeDetails');
        }
        else {
          setButtonName('submit');
          setUrl('http://216.48.185.128:3001/assetEmp/empRegister');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const validateForm = () => {
      let valid = true;
      for (let key in errors) {
        if (formData[key] === '') {
          valid = false;
          setSnackbarSeverity('error');
          setSnackbarMessage(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
          setSnackbarOpen(true);
          break;
        }
      }
      return valid;
    };

    setIsFormValid(validateForm());
  }, [formData, errors]);

  const handleChange = (field, value) => {
    updateFormData(field, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: !value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setSnackbarMessage('Please fill out all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    try {
      // console.log('Submitting to URL:', url);
      // console.log('Form data:', JSON.stringify(formData));
      const response = await axios.post(url,formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength:Infinity,
        maxContentLength:Infinity,
        //timeout: 20000 
      });
      if (response.data.status === 'success') {
        if (buttonName === 'update') {
          setSnackbarMessage('Data successfully updated!');
        }
         else {
          setSnackbarMessage('Data successfully added!');
        }
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } 
      else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setSnackbarMessage('Data not added! ' + (error.response.data.message || 'An error occurred.'));
      } else if (error.request) {
        // Request was made but no response received
        setSnackbarMessage('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        setSnackbarMessage('Error: ' + error.message);
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AssignRolesForm;
// import React, { useContext, useState, useEffect } from 'react';
// import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
// import AppContext from '../../AppContext/AppContext';
// import axios from 'axios';

// const AssignRolesForm = () => {
//   const { formData, updateFormData, errors, setErrors } = useContext(AppContext);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('submit');
//   const [buttonName, setButtonName] = useState('update');
//   const [url, setUrl] = useState("http://216.48.185.128:3001/assetEmp/empRegister");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById", {"empId": formData.empId});
//         const data = response.data;
//         console.log(data);
//         if (data.status === "success") {
//           setButtonName('update');
//           setUrl('http://216.48.185.128:3001/assetEmp/editEmployeeDetails');
//         } else {
//           setButtonName('submit');
//           setUrl('http://216.48.185.128:3001/assetEmp/empRegister');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     if (formData.empId) {
//       fetchData();
//     }
//   }, []);

//   useEffect(() => {
//     const validateForm = () => {
//       let valid = true;
//       for (let key in errors) {
//         if (formData[key] === '') {
//           valid = false;
//           setSnackbarSeverity('error');
//           setSnackbarMessage(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
//           setSnackbarOpen(true);
//           break;
//         }
//       }
//       return valid;
//     };

//     setIsFormValid(validateForm());
//   }, [formData, errors]);

//   const handleChange = (field, value) => {
//     updateFormData(field, value);
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [field]: !value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) {
//       setSnackbarMessage('Please fill out all required fields.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }
//     try {
//       console.log('Submitting to URL:', url);
//       console.log('Form data:', formData);
//       const response = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         timeout: 20000 
//       });
//       console.log('Response:', response.data);
//       if (response.data.status === 'success') {
//         if (buttonName === 'update') {
//           setSnackbarMessage('Data successfully updated!');
//         } else {
//           setSnackbarMessage('Data successfully added!');
//         }
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       } else {
//         setSnackbarMessage(response.data.message);
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       if (error.response) {
//         setSnackbarMessage('Data not added! ' + (error.response.data.message || 'An error occurred.'));
//       } else if (error.request) {
//         setSnackbarMessage('No response from server. Please try again later.');
//       } else {
//         setSnackbarMessage('Error: ' + error.message);
//       }
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>Assign Roles to Employee</Typography>
//       <TextField
//         label='Employee Id'
//         variant="outlined"
//         fullWidth
//         value={formData.empId || ''}
//         sx={{ mb: 2 }}
//         onChange={e => handleChange('empId', e.target.value)}
//         error={!!errors.empId}
//         helperText={errors.empId ? 'Employee Id is required' : ''}
//         disabled={buttonName === 'update'}
//       />
//       <TextField
//         label='Employee Name'
//         variant="outlined"
//         fullWidth
//         value={formData.firstName || ''}
//         sx={{ mb: 2 }}
//         disabled
//       />

//       <FormControl fullWidth sx={{ mb: 2 }} required error={!!errors.designation}>
//         <InputLabel id="designation-label">Designation</InputLabel>
//         <Select
//           labelId="designation-label"
//           id="designation-select"
//           value={formData.designation || ''}
//           label="Designation"
//           onChange={e => handleChange('designation', e.target.value)}
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           <MenuItem value="software engineer">Software Engineer</MenuItem>
//           <MenuItem value="sr.software engineer">Sr. Software Engineer</MenuItem>
//           <MenuItem value="Team Lead">Team Lead</MenuItem>
//           <MenuItem value="projectManager">Project Manager</MenuItem>
//           <MenuItem value="DeliveryManager">Delivery Manager</MenuItem>
//         </Select>
//         {errors.designation && <Typography color="error">Designation is required</Typography>}
//       </FormControl>

//       <FormControl fullWidth sx={{ mb: 2 }} required error={!!errors.reportingTo}>
//         <InputLabel id="reportingTo-label">Reporting to</InputLabel>
//         <Select
//           labelId="reportingTo-label"
//           id="reportingTo-select"
//           value={formData.reportingTo || ''}
//           label="Reporting To"
//           onChange={e => handleChange('reportingTo', e.target.value)}
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           <MenuItem value="SEG">SEG Team</MenuItem>
//           <MenuItem value="Mobile">Mobile Team</MenuItem>
//           <MenuItem value="POC">POC</MenuItem>
//         </Select>
//         {errors.reportingTo && <Typography color="error">Reporting To is required</Typography>}
//       </FormControl>

//       <TextField
//         label="Responsibilities"
//         variant="outlined"
//         fullWidth
//         value={formData.responsibilities || ''}
//         onChange={e => handleChange('responsibilities', e.target.value)}
//         error={!!errors.responsibilities}
//         helperText={errors.responsibilities ? 'Please enter your responsibilities' : ''}
//         sx={{ mb: 2 }}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
//         {buttonName}
//       </Button>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AssignRolesForm;



