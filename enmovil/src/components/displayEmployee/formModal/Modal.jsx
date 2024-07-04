// import React, { useRef, useState } from 'react';
// import { Button, Grid, Typography, Snackbar, Alert } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import axios from 'axios';
// import './Modal.css';
// const Modal = ({ show, onClose }) => {
//     const [file, setFile] = useState(null);
//     const dropzoneRef = useRef();
//     const [error, setError] = useState('');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const droppedFile = event.dataTransfer.files[0];
//         setFile(droppedFile);
//     };
//     const handleDragOver = (event) => {
//         event.preventDefault();
//         if (dropzoneRef.current) {
//             dropzoneRef.current.classList.add('dragging');
//         }
//     };   
//     const handleDragLeave = () => {
//         if (dropzoneRef.current) {
//             dropzoneRef.current.classList.remove('dragging');
//         }
//     };

//     const handleFileSelect = (event) => {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);
//     };

//     const parseCSV = (text) => {
//         const lines = text.split('\n');
//         const headers = lines[0].split(',').map(header => header.trim());
//         return lines.slice(1).map(line => {
//             const values = line.split(',').map(value => value.trim());
//             return headers.reduce((obj, header, index) => {
//                 obj[header] = values[index];
//                 return obj;
//             }, {});
//         });
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             setError('Please select a file first.');
//             return;
//         }

//         const fileType = file.name.split('.').pop().toLowerCase();
//         if (!['csv', 'xls', 'xlsx'].includes(fileType)) {
//             setError('Please upload a CSV or Excel file.');
//             return;
//         }

//         setError('');
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//             const text = event.target.result;
//             const csvData = parseCSV(text);
//             try {
//                 const response = await axios.post("http://216.48.185.128:3001/assetEmp/empRegister", csvData, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 console.log(csvData,response);
//                 if(response.data.status==='failure'){
//                   setSnackbarSeverity('success');
//                   setSnackbarMessage(`${response.data.message}`);
//                 }
//                 else{
//                   setSnackbarSeverity('success');
//                   setSnackbarMessage(`${response.data.successCount} added successfully out of ${response.data.successCount + response.data.failureCount}`);
//                 }
//             } catch (e) {
//                 console.error('Error uploading data:', e);
//                 setSnackbarSeverity('error');
//                 setSnackbarMessage('Error uploading data');
//             } finally {
//                 setSnackbarOpen(true);
//             }
//         };
//         reader.readAsText(file);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <div className={`modal ${show ? 'show' : ''}`}>
//             <div className="modal-content">
//                 <button className="close-button" onClick={onClose}>X</button>
//                 <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ padding: 20 }}>
//                     <Grid container item spacing={2} justifyContent="space-between" style={{marginRight:10}}>
//                         <Grid item>
//                             <div
//                                 ref={dropzoneRef}
//                                 className="dropzone"
//                                 onDrop={handleDrop}
//                                 onDragOver={handleDragOver}
//                                 onDragLeave={handleDragLeave}
//                             >
//                                 <input type="file" onChange={handleFileSelect} />
//                                 <CloudUploadIcon style={{ fontSize: 40, marginBottom: 10,marginRight:10 }} />
//                                 <p style={{ marginRight:10 }}>Drag & drop a file here, or click to select a file</p>
//                             </div>
//                             {file && (
//                                 <div className="files-list">
//                                     <h4>Selected File</h4>
//                                     <ul>
//                                         <li>{file.name}</li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </Grid>
//                         <Grid item>
//                             {file && (
//                                 <Button variant="outlined" color="primary" onClick={handleSubmit}>
//                                     Submit
//                                 </Button>
//                             )}
//                         </Grid>
//                     </Grid>
//                     <Grid item>
//                         {error && <Typography color="error">{error}</Typography>}
//                     </Grid>
//                 </Grid>
//                 <Snackbar
//                     open={snackbarOpen}
//                     autoHideDuration={6000}
//                     onClose={handleCloseSnackbar}
//                     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//                 >
//                     <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                         {snackbarMessage}
//                     </Alert>
//                 </Snackbar>
//             </div>
//         </div>
//     );
// };

// export default Modal;
// Modal.js
import React, { useRef, useState } from 'react';
import { Button, Grid, Typography, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import DownloadSampleFileButton from './DownloadSampleFileButton';
import './Modal.css';

const Modal = ({ show, onClose }) => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const dropzoneRef = useRef();
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.add('dragging');
        }
    };

    const handleDragLeave = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.remove('dragging');
        }
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!['csv', 'xls', 'xlsx'].includes(fileType)) {
            setError('Please upload a CSV or Excel file.');
            setFile(null);
            setParsedData([]);
            return;
        }
        setError('');
        setFile(file);
        parseFile(file);
    };

    const parseCSV = (text) => {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });
    };

    const parseFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const csvData = parseCSV(text);
            setParsedData(csvData);
        };
        reader.readAsText(file);
    };

    const handleSubmit = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setError('');
        try {
            const response = await axios.post("http://216.48.185.128:3001/assetEmp/empRegister", parsedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(parsedData, response);
            if (response.data.status === 'failure') {
                setSnackbarSeverity('error');
                setSnackbarMessage(`${response.data.message}`);
                console.log(`${response.data.successCount} added successfully out of ${response.data.successCount + response.data.failureCount}`)
            } else {
                setSnackbarSeverity('success');
                setSnackbarMessage(`${response.data.successCount} added successfully out of ${response.data.successCount + response.data.failureCount}`);
            }
        } catch (e) {
            console.error('Error uploading data:', e);
            setSnackbarSeverity('error');
            setSnackbarMessage('Error uploading data');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <DownloadSampleFileButton/>
                <button className="close-button" onClick={onClose}>X</button>
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ padding: 20 }}>
                    <Grid container item spacing={2} justifyContent="space-between" style={{ marginRight: 10 }}>
                        <Grid item>
                            <div
                                ref={dropzoneRef}
                                className="dropzone"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input type="file" onChange={handleFileSelect} />
                                <CloudUploadIcon style={{ fontSize: 40, marginBottom: 10, marginRight: 10 }} />
                                <p style={{ marginRight: 10 }}>Drag & drop a file here, or click to select a file</p>
                            </div>
                            {file && (
                                <div className="files-list">
                                    <h4>Selected File</h4>
                                    <ul>
                                        <li>{file.name}</li>
                                    </ul>
                                </div>
                            )}
                        </Grid>
                        <Grid item>
                            {file && (
                                <Button variant="outlined" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    {parsedData.length > 0 && (
                        <Grid item style={{ width: '100%' }}>
                            <Typography>Go through the data before submitting</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Object.keys(parsedData[0]).map((key) => (
                                                <TableCell key={key}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {parsedData.map((row, index) => (
                                            <TableRow key={index}>
                                                {Object.values(row).map((value, idx) => (
                                                    <TableCell key={idx}>{value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                    <Grid item>
                        {error && <Typography color="error">{error}</Typography>}
                    </Grid>
                </Grid>
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
            </div>
        </div>
    );
};

export default Modal;
