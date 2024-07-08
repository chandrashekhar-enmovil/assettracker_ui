// import React, { useContext, useState, useEffect } from 'react';
// import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
// import AppContext from '../../AppContext/AppContext';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../authcontext/AuthContext';

// const AssignRolesForm = () => {
//   const { formData, updateFormData, errors, setErrors,setFormData,initialFormData } = useContext(AppContext);
//   const { logout,user} = useAuth();
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('submit');
//   const [buttonName, setButtonName] = useState('update');
//   const [url, setUrl] = useState("http://216.48.185.128:3001/assetEmp/empRegister");
//   const navigate = useNavigate();
//   useEffect(() => {
//     // console.log(user,'nene pilicha')
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById",{"empId":formData.empId || '*&6'});
//         const data = response.data;
//         console.log(data)
//         if (data.status === "success") {
//           setButtonName('update');
//           setUrl('http://216.48.185.128:3001/assetEmp/editEmployeeDetails');
//         }
//         else {
//           setButtonName('submit');
//           setUrl('http://216.48.185.128:3001/assetEmp/empRegister');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
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
//       if(formData.yearsOfExperience!='0'){
//         let variant=formData.experience[0];
//         for(let key in variant)
//         {
          
//             if(variant[key]==='')
//             {
//               valid=false
//               setSnackbarSeverity('error');
//               setSnackbarMessage(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
//               setSnackbarOpen(true);
//               return valid
//             }
//         }
//       }
//       return valid;
//     };

//     setIsFormValid(validateForm());
//   }, [formData, errors,formData.yearsOfExperience]);

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
//       // console.log('Submitting to URL:', url);
//        console.log('Form data:', formData);
//       const response = await axios.post(url,{
//         firstName: formData.firstName,
//         fatherName: formData.fatherName,
//         fatherBirthDate: formData.fatherBirthDate,
//         fatherOccupation: formData.fatherOccupation,
//         motherName: formData.motherName,
//         motherBirthDate: formData.motherBirthDate,
//         motherOccupation: formData.motherOccupation,
//         address: formData.address,
//         city: formData.city,
//         zipCode: formData.zipCode,
//         state: formData.state,
//         email: formData.email,
//         phHome: formData.phHome,
//         phonePersonal: formData.phonePersonal,
//         alternative: formData.alternative,
//         birthDate: formData.birthDate,
//         age: formData.age,
//         gender: formData.gender,
//         maritalStatus: formData.maritalStatus,
//         aadhar: formData.aadhar,
//         pan: formData.pan,
//         uan: formData.uan,
//         esi: formData.esi,
//         bank: formData.bank,
//         account: formData.account,
//         ifsc: formData.ifsc,
//         spouse: formData.spouse,
//         spouseAge: formData.spouseAge,
//         spouseGender: formData.spouseGender,
//         spouseBirthDate: formData.spouseBirthDate,
//         children1: formData.children1,
//         childrenGender1: formData.childrenGender1,
//         childrenDob1: formData.childrenDob1,
//         childrenAge1: formData.childrenAge1,
//         children2: formData.children2,
//         childrenGender2: formData.childrenGender2,
//         childrenDob2: formData.childrenDob2,
//         childrenAge2: formData.childrenAge2,
//         schoolName: formData.schoolName,
//         boardName: formData.boardName,
//         schoolPass: formData.schoolPass,
//         schoolGrade: formData.schoolGrade,
//         interName: formData.interName,
//         interBoard: formData.interBoard,
//         interPass: formData.interPass,
//         interGrade: formData.interGrade,
//         graduationName: formData.graduationName,
//         graduationBoard: formData.graduationBoard,
//         graduationPass: formData.graduationPass,
//         graduationGrade: formData.graduationGrade,
//         pgBoard: formData.pgBoard,
//         pgPass: formData.pgPass,
//         pgName: formData.pgName,
//         pgGrade: formData.pgGrade,
//         certifications: formData.certifications,
//         experience: formData.experience,
//         skillsByCategory: formData.skillsByCategory,
//         responsibilities: formData.responsibilities,
//         role: formData.role,
//         team: formData.team,
//         designation: formData.designation,
//         reportingTo: formData.reportingTo,
//         empId: formData.empId,
//         yearsOfExperience: formData.yearsOfExperience,
//     }
    
//     , {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.data.status === 'success') {
//         if (buttonName === 'update') {
//           setSnackbarMessage('Data successfully updated!');
//           setSnackbarSeverity('success');
//           setSnackbarOpen(true);
//         }
//          else {
//           setSnackbarMessage('Data successfully added!');
//           setSnackbarSeverity('success');
//           setSnackbarOpen(true);
//           setTimeout(() => {
//             setFormData(initialFormData);
//           }, 5000);
//         }
//         setTimeout(() => {
//           navigate(`/employees/`);

//         },1500);
//       } 
//       else {
//         setSnackbarMessage(response.data.message);
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a status other than 200 range
//         setSnackbarMessage('Data not added! ' + (error.response.data.message || 'An error occurred.'));
//       } else if (error.request) {
//         // Request was made but no response received
//         setSnackbarMessage('No response from server. Please try again later.');
//       } else {
//         // Something happened in setting up the request
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
//       <br/>
//       {user.role!='admin' &&<Button  variant="contained" color="primary" onClick={logout}>
//         {"logout"}
//       </Button>}
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




// import React, { useContext, useState, useEffect } from 'react';
// import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
// import AppContext from '../../AppContext/AppContext';
// import { useAuth } from '../../authcontext/AuthContext';
// import FormSubmitHandler from './FormSubmitHandler';
// import axios from 'axios';

// const AssignRolesForm = () => {
//   const { formData, updateFormData, errors, setErrors, setFormData, initialFormData } = useContext(AppContext);
//   const { logout, user } = useAuth();
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('submit');
//   const [buttonName, setButtonName] = useState('update');
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById", {"empId": formData.empId || '*&6'});
//         const data = response.data;
//         if (data.status === "success") {
//           setButtonName('update');
//         } else {
//           setButtonName('submit');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [formData.empId]);

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
//       if (formData.yearsOfExperience !== '0') {
//         let variant = formData.experience[0];
//         for (let key in variant) {
//           if (variant[key] === '') {
//             valid = false;
//             setSnackbarSeverity('error');
//             setSnackbarMessage(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
//             setSnackbarOpen(true);
//             return valid;
//           }
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

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container component="form" sx={{ mt: 4 }}>
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
//       <br/>
//       {user.role !== 'admin' &&<Button variant="contained" color="primary" onClick={logout}>
//         {"logout"}
//       </Button>}
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
//       <FormSubmitHandler
//         formData={formData}
//         buttonName={buttonName}
//         setSnackbarMessage={setSnackbarMessage}
//         setSnackbarSeverity={setSnackbarSeverity}
//         setSnackbarOpen={setSnackbarOpen}
//         setFormData={setFormData}
//         initialFormData={initialFormData}
//       />
//     </Container>
//   );
// };

// export default AssignRolesForm;




import React, { useContext, useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Typography, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import AppContext from '../../AppContext/AppContext';
import { useAuth } from '../../authcontext/AuthContext';
import FormSubmitHandler from './FormSubmitHandler';
import axios from 'axios';
import validateForm from '../validateForm/ValidateForm';

const AssignRolesForm = () => {
  const { formData, updateFormData, errors, setErrors, setFormData, initialFormData } = useContext(AppContext);
  const { logout, user } = useAuth();
  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'submit'
  });
  const [buttonName, setButtonName] = useState('update');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById", {"empId": formData.empId || '*&6'});
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
  }, [formData, errors]);

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
    <Container component="form" sx={{ mt: 4 }}>
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
      <br/>
      {user.role !== 'admin' &&<Button variant="contained" color="primary" onClick={logout}>
        {"logout"}
      </Button>}
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
      <FormSubmitHandler
        formData={formData}
        buttonName={buttonName}
        setSnackbarMessage={(message) => setSnackbar(prev => ({ ...prev, message }))}
        setSnackbarSeverity={(severity) => setSnackbar(prev => ({ ...prev, severity }))}
        setSnackbarOpen={(open) => setSnackbar(prev => ({ ...prev, open }))}
        setFormData={setFormData}
        initialFormData={initialFormData}
      />
    </Container>
  );
};

const SelectBlock = ({ label, placeholder, onChange, value, options, width }) => (
  <div className="mr-5p" style={{ width }}>
    <label>{label}</label>
    <Select
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      options={options}
    />
  </div>
);

export default AssignRolesForm;
