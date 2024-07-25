import React, { useContext, useState } from 'react';
import { Container, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AppContext from '../../AppContext/AppContext';

const Input = styled('input')({
  display: 'none',
});

const UploadIcon = ({ uploadName, description }) => {
  const { formData, setFormData } = useContext(AppContext);

  const handleFileChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.files[0],
    });
  };

  return (
    <Container maxWidth="xlg">
      <Paper elevation={1} sx={{ padding: 1, marginTop: 0 }}>
        <Box component="form">
          <Grid item xs={12}>
            <label htmlFor={uploadName}>
              <Input
                accept=".pdf,.doc,.docx"
                id={uploadName}
                type="file"
                onChange={(e) => handleFileChange(e, uploadName)}
              />
              <Button outlined="outlined" component="span" startIcon={<CloudUploadIcon />}>
                {description}
              </Button>
            </label>
          </Grid>
        </Box>
      </Paper>
      {formData[uploadName] && (
        <Typography variant="body2">{formData[uploadName].name}</Typography>
      )}
    </Container>
  );
};

export default UploadIcon;
