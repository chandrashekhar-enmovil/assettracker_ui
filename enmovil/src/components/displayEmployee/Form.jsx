// import React, { useRef, useState } from 'react';
// import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
// import { Button, Grid, Typography, Snackbar, Alert } from '@mui/material';
// import axios from 'axios';
// import ManinHeader from './formModal/MainHeader';

// const Form = () => {
//     const navigate = useNavigate();
//     // const [file, setFile] = useState(null);
//     // const fileInputRef = useRef(null);
//     // const [parsedData, setParsedData] = useState([]);
//     // const [error, setError] = useState('');
//     // const [snackbarOpen, setSnackbarOpen] = useState(false);
//     // const [snackbarMessage, setSnackbarMessage] = useState('');
//     // const [snackbarSeverity, setSnackbarSeverity] = useState('success');  
//     // const parseCSV = (text) => {
//     //     const lines = text.split('\n');
//     //     const headers = lines[0].split(',').map(header => header.trim());
//     //     return lines.slice(1).map(line => {
//     //         const values = line.split(',').map(value => value.trim());
//     //         return headers.reduce((obj, header, index) => {
//     //             obj[header] = values[index];
//     //             return obj;
//     //         }, {});
//     //     });
//     // };

//     // const handleSubmit = async () => {
//     //     if (!file) {
//     //         setError('Please select a file first.');
//     //         return;
//     //     }

//     //     const fileType = file.name.split('.').pop().toLowerCase();
//     //     if (!['csv', 'xls', 'xlsx'].includes(fileType)) {
//     //         setError('Please upload a CSV or Excel file.');
//     //         return;
//     //     }

//     //     setError('');
//     //     const reader = new FileReader();
//     //     reader.onload = async (event) => {
//     //         const text = event.target.result;
//     //         const csvData = parseCSV(text);
//     //         setParsedData(csvData);
//     //         console.log(csvData);
//     //         try {
//     //             // console.log('Server Response:', response.data);
//     //             const response = await axios.post("http://216.48.185.128:3001/assetEmp/empRegister", csvData, {
//     //                 headers: {
//     //                     'Content-Type': 'application/json'
//     //                 }
//     //             });
//     //             console.log('Server Response:', response.data);
//     //             setSnackbarSeverity('success');
//     //             setSnackbarMessage(`${response.data.successCount} added successfully out of ${response.data.successCount+response.data.failureCount} `);
//     //         } catch (e) {
//     //             console.error('Error uploading data:', e);
//     //             setSnackbarSeverity('error');
//     //             setSnackbarMessage('Error uploading data');
//     //         } finally {
//     //             setSnackbarOpen(true);
//     //         }
//     //     };
//     //     reader.readAsText(file);
//     // };

//     // const handle = async () => {
//     //     try {
//     //         alert('Login failed: Invalid email or password');
//     //         navigate('/joiningforms');
//     //     } catch (error) {
//     //         alert('Login failed: Invalid email or password');
//     //     }
//     // };

//     // const changeShipmentFileHandler = (event) => {
//     //     const selectedFile = event.target.files[0];
//     //     if (selectedFile) {
//     //         setFile(selectedFile);
//     //     }
//     // };

//     // const handleButtonClick = () => {
//     //     if (fileInputRef.current) {
//     //         fileInputRef.current.click(); // Programmatically click the hidden file input
//     //     }
//     // };

//     // const handleCloseSnackbar = () => {
//     //     setSnackbarOpen(false);
//     // };

//     return (
//         <>
//             <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ padding: 20 }}>
//                 <Grid container item spacing={2} justifyContent="space-between">
//                     <Grid item>
//                         <Link to="/app/joiningforms">
//                             <Button variant="outlined">
//                                 Add Employee
//                             </Button>
//                         </Link>
//                     </Grid>
//                     <Grid item>
//                         {/* <input
//                             type="file"
//                             ref={fileInputRef}
//                             id="uploadFile"
//                             name="uploadFile"
//                             style={{ display: 'none' }}
//                             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                             onChange={changeShipmentFileHandler}
//                             required
//                         /> */}
//                         <ManinHeader/>
//                         {/* <Button variant="outlined" onClick={handleButtonClick}>
//                             Bulk Upload
//                         </Button> */}
//                     </Grid>
//                     {/* <Grid item>
//                         {file && (
//                             <Button variant="contained" color="primary" onClick={handleSubmit}>
//                                 Submit
//                             </Button>
//                         )}
//                     </Grid> */}
//                 </Grid>
//                 {/* <Grid item>
//                     {error && <Typography color="error">{error}</Typography>}
//                 </Grid> */}
//             </Grid>
//             {/* <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar> */}
//         </>
//     );
// };

// export default Form;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import ManinHeader from './formModal/MainHeader';

const Form = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ padding: 20 }}>
                <Grid container item spacing={2} justifyContent="space-between">
                    <Grid item>
                        <Link to="/app/joiningforms">
                            <Button variant="outlined">
                                Add Employee
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <ManinHeader />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Form;
