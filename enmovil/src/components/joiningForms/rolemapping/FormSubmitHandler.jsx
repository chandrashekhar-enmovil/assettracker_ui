import axios from 'axios';

const useFormSubmitHandler = ({ formData, buttonName, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, setFormData, initialFormData, navigate }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = buttonName === 'update'
      ? process.env.REACT_APP_UPDATE_API
      : process.env.REACT_APP_ADD_EMPLOYEE_API
    try {
      const response = await axios.post(url, {
        firstName: formData.firstName,
        fatherName: formData.fatherName,
        fatherBirthDate: formData.fatherBirthDate,
        fatherOccupation: formData.fatherOccupation,
        motherName: formData.motherName,
        motherBirthDate: formData.motherBirthDate,
        motherOccupation: formData.motherOccupation,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        state: formData.state,
        email: formData.email,
        phHome: formData.phHome,
        phonePersonal: formData.phonePersonal,
        alternative: formData.alternative,
        birthDate: formData.birthDate,
        age: formData.age,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        aadhar: formData.aadhar,
        pan: formData.pan,
        uan: formData.uan,
        esi: formData.esi,
        bank: formData.bank,
        account: formData.account,
        ifsc: formData.ifsc,
        spouse: formData.spouse,
        spouseAge: formData.spouseAge,
        spouseGender: formData.spouseGender,
        spouseBirthDate: formData.spouseBirthDate,
        children1: formData.children1,
        childrenGender1: formData.childrenGender1,
        childrenDob1: formData.childrenDob1,
        childrenAge1: formData.childrenAge1,
        children2: formData.children2,
        childrenGender2: formData.childrenGender2,
        childrenDob2: formData.childrenDob2,
        childrenAge2: formData.childrenAge2,
        schoolName: formData.schoolName,
        boardName: formData.boardName,
        schoolPass: formData.schoolPass,
        schoolGrade: formData.schoolGrade,
        interName: formData.interName,
        interBoard: formData.interBoard,
        interPass: formData.interPass,
        interGrade: formData.interGrade,
        graduationName: formData.graduationName,
        graduationBoard: formData.graduationBoard,
        graduationPass: formData.graduationPass,
        graduationGrade: formData.graduationGrade,
        pgBoard: formData.pgBoard,
        pgPass: formData.pgPass,
        pgName: formData.pgName,
        pgGrade: formData.pgGrade,
        certifications: formData.certifications,
        experience: formData.experience,
        skillsByCategory: formData.skillsByCategory,
        responsibilities: formData.responsibilities,
        role: formData.role,
        team: formData.team,
        designation: formData.designation,
        reportingTo: formData.reportingTo,
        empId: formData.empId,
        yearsOfExperience: formData.yearsOfExperience,
        criminal: formData.criminal,
        doConviction: formData.doConviction,
        sentence: formData.sentence,
        bankBook:formData.bankBook,
        panFile:formData.panFile,
        aadharFile:formData.aadharFile,
        cancelledCheque:formData.cancelledCheque
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      if (response.data.status === 'success') {
        setSnackbarMessage(buttonName === 'update' ? 'Employee Data successfully updated!' : 'Employee Data successfully added!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        if (buttonName !== 'update') {
          setTimeout(() => {
            setFormData(initialFormData);
          }, 5000);
        }
        setTimeout(() => {
          navigate('/');
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

  return handleSubmit;
};
export default useFormSubmitHandler;