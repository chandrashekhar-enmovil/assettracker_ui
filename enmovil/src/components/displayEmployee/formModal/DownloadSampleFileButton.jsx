import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const sampleData = [
  {
    firstName: 'John',
    fatherName: 'Robert',
    fatherBirthDate: '1955-05-15',
    fatherOccupation: 'Engineer',
    motherName: 'Linda',
    motherBirthDate: '1960-08-25',
    motherOccupation: 'Teacher',
    address: '123 Elm St',
    city: 'Springfield',
    zipCode: '62701',
    state: 'IL',
    email: 'john.doe@example.com',
    phHome: '555-1234',
    phonePersonal: '555-5678',
    alternative: '555-8765',
    birthDate: '1985-04-12',
    age: '39',
    gender: 'Male',
    maritalStatus: 'Married',
    aadhar: '1234-5678-9012',
    pan: 'ABCDE1234F',
    uan: '100200300',
    esi: '9876543210',
    bank: 'Bank of America',
    account: '0123456789',
    ifsc: 'BOFA0001234',
    spouse: 'Jane',
    spouseAge: '35',
    spouseGender: 'Female',
    spouseBirthDate: '1989-02-10',
    children1: 'Emily',
    childrenGender1: 'Female',
    childrenDob1: '2015-09-20',
    childrenAge1: '8',
    children2: 'Michael',
    childrenGender2: 'Male',
    childrenDob2: '2018-05-22',
    childrenAge2: '6',
    schoolName: 'Springfield High',
    boardName: 'State Board',
    schoolPass: '2002',
    schoolGrade: 'A',
    interName: 'Springfield Junior College',
    interBoard: 'State Board',
    interPass: '2004',
    interGrade: 'A',
    graduationName: 'State University',
    graduationBoard: 'State Board',
    graduationPass: '2008',
    graduationGrade: 'A',
    pgBoard: 'State Board',
    pgPass: '2010',
    pgName: 'State University',
    pgGrade: 'A',
    certifications: [
      { courseName: 'Project Management', issuingAuthority: 'PMI', tenure: '6 months', certificateDate: '2011-06-01', supervisorName: 'Tom Hanks', supervisorInfo: 'Senior Manager' }
    ],
    experience: [
      { companyName: 'Tech Corp', designation: 'Software Engineer', department: 'IT', tenure: '5 years' }
    ],
    skillsByCategory: {
      Programming: ['Java', 'Python'],
      Management: ['Project Management']
    },
    responsibilities: 'Develop and manage software projects.',
    role: 'Lead Developer',
    team: 'Development',
    designation: 'Senior Software Engineer',
    reportingTo: 'CTO',
    empId: 'EMP001',
    yearsOfExperience: '15'
  }
];

const flattenObject = (obj, parent = '', res = {}) => {
  for (let key in obj) {
    const propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const generateSampleExcel = () => {
  const flatData = sampleData.map(item => flattenObject(item));
  const ws = XLSX.utils.json_to_sheet(flatData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sample Data');
  XLSX.writeFile(wb, 'SampleData.xlsx');
};

const DownloadSampleFileButton = () => (
  <Button variant="contained" color="primary" onClick={generateSampleExcel}>
    Download Sample File
  </Button>
);

export default DownloadSampleFileButton;
