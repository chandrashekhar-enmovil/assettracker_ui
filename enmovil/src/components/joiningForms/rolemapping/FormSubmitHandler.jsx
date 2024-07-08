import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authcontext/AuthContext';
// import { useContext } from 'react';
// import AppContext from '../../AppContext/AppContext';

const FormSubmitHandler = ({ formData, buttonName, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, setFormData, initialFormData }) => {
//   const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = buttonName === 'update'
      ? 'http://216.48.185.128:3001/assetEmp/editEmployeeDetails'
      : 'http://216.48.185.128:3001/assetEmp/empRegister';

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        setSnackbarMessage(buttonName === 'update' ? 'Data successfully updated!' : 'Data successfully added!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        if (buttonName !== 'update') {
          setTimeout(() => {
            setFormData(initialFormData);
          }, 5000);
        }

        setTimeout(() => {
          navigate('/employees/');
        }, 1500);
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        setSnackbarMessage('Data not added! ' + (error.response.data.message || 'An error occurred.'));
      } else if (error.request) {
        setSnackbarMessage('No response from server. Please try again later.');
      } else {
        setSnackbarMessage('Error: ' + error.message);
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

//   return <button type="submit" onClick={handleSubmit}>Submit</button>;
};

export default FormSubmitHandler;
