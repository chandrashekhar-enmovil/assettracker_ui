import React, { useState } from 'react';
import axios from 'axios';

const EmployeeAbout = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    console.log(selectedFile)
    formData.append('file', selectedFile);
    formData.append('name', 'John Doe');
    formData.append('description', 'Profile picture');
  
    try {
        console.log(formData)
      const response = await axios.post('http://your-backend-endpoint/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.log(formData)
      console.error('Error uploading file:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default EmployeeAbout;
