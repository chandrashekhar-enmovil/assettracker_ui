import React, { useState } from 'react';
import { Container, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const Input = styled('input')({
  display: 'none',
});
const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    resume: null,
    offerLetter: null,
    relievingLetter: null,
    passportPhoto: null,
  });
  const handleFileChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.files[0],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <Container maxWidth="xlg">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography outlined="h6" gutterBottom>
            Document Upload Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="resume">
                <Input
                  accept=".pdf,.doc,.docx"
                  id="resume"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'resume')}
                />
                <Button outlined="outlined" component="span" fullWidth startIcon={<CloudUploadIcon/>}>
                  Upload Resume
                </Button>
                {formData.resume && (
                  <Typography outlined="body2">{formData.resume.name}</Typography>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="offerLetter">
                <Input
                  accept=".pdf,.doc,.docx"
                  id="offerLetter"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'offerLetter')}
                />
                <Button outlined="outlined" component="span" fullWidth startIcon={<CloudUploadIcon />}>
                  Upload Offer Letter & Acceptance Letter
                </Button>
                {formData.offerLetter && (
                  <Typography outlined="body2">{formData.offerLetter.name}</Typography>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="relievingLetter">
                <Input
                  accept=".pdf,.doc,.docx"
                  id="relievingLetter"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'relievingLetter')}
                />
                <Button outlined="outlined" component="span" fullWidth startIcon={<CloudUploadIcon />}>
                  Upload Previous Employment Relieving Letter and Last 3 months Payslips
                </Button>
                {formData.relievingLetter && (
                  <Typography outlined="body2">{formData.relievingLetter.name}</Typography>
                )}
              </label>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="passportPhoto">
                <Input
                  accept=".jpg,.jpeg,.png"
                  id="passportPhoto"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'passportPhoto')}
                />
                <Button outlined="outlined" component="span" fullWidth startIcon={<CloudUploadIcon/>}>
                  Upload Passport Size Photo
                </Button>
                {formData.passportPhoto && (
                  <Typography outlined="body2">{formData.passportPhoto.name}</Typography>
                )}
              </label>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
export default DocumentUploadForm;
