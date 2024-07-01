import {useState} from 'react';
const Appdata = () => {
    const initialFormData = {
        firstName: '',
        fatherName: '',
        fatherBirthDate: '',
        fatherOccupation: '',
        motherName: '',
        motherBirthDate: '',
        motherOccupation: '',
        address: '',
        city: '',
        zipCode: '',
        state: '',
        email: '',
        phHome: '',
        phonePersonal: '',
        alternative: '',
        birthDate: '',
        age: '',
        gender: '',
        maritalStatus: '',
        aadhar: '',
        pan: '',
        uan: '',
        esi: '',
        bank: '',
        account: '',
        ifsc: '',
        spouse: '',
        spouseAge: '',
        spouseGender: '',
        spouseBirthDate: '',
        children1: '',
        childrenGender1: '',
        childrenDob1: '',
        childrenAge1: '',
        children2: '',
        childrenGender2: '',
        childrenDob2: '',
        childrenAge2: '',
        schoolName: '',
        boardName: '',
        schoolPass: '',
        schoolGrade: '',
        interName: '',
        interBoard: '',
        interPass: '',
        interGrade: '',
        graduationName: '',
        graduationBoard: '',
        graduationPass: '',
        graduationGrade: '',
        pgBoard: '',
        pgPass: '',
        pgName: '',
        pgGrade: '',
        certifications: [
          { courseName: '', issuingAuthority: '', tenure: '', certificateDate: '',supervisorName: '' , supervisorInfo: ''}
        ],
        experience: [
          { companyName: '', designation: '', department: '', tenure: '' }
        ],
        skillsByCategory: {},
        responsibilities: '',
        role: '',
        team: '',
        designation: '',
        reportingTo: '',
        empId: '',
        yearsOfExperience: '',
      };
    
      const initialErrors = {
        firstName: false,
        // address: false,
        // city: false,
        // email: false,
        // state: false,
        // zipCode: false,
        // birthDate: false,
        // age: false,
        // aadhar: false,
        // pan: false,
        // bank: false,
        // account: false,
        // ifsc: false,
        // phonePersonal: false,
        // schoolName: false,
        // boardName: false,
        // schoolPass: false,
        // schoolGrade: false,
        // interName: false,
        // interBoard: false,
        // interPass: false,
        // interGrade: false,
        responsibilities: false,
        reportingTo: false,
        empId: false,
      };
    
      const [errors, setErrors] = useState(initialErrors);
      const [formData, setFormData] = useState(initialFormData);
    

    return { errors, setErrors, formData, setFormData,initialErrors,initialFormData};
};
export default Appdata;