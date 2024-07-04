import React, { createContext, useContext, useEffect, useState } from 'react';
import Pagination from './Pagination';
import JoiningForm from '../personaldetails/JoiningForm';
import Education from '../education/Education';
import Experience from '../experience/Experience';
import { View,StyleSheet } from 'react-native';
import AppContext, { AppProvider } from '../../AppContext/AppContext';
import AssignRolesForm from '../rolemapping/AssignRoleForm';
import { Route, Router, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import Appdata from '../../AppContext/Appdata';
import BgvCheck from '../bgvcheck/BgvCheck';
const Maincomponent = () => {
  const { formData,setFormData,errors,setErrors} = useContext(AppContext);
  var {id}=useParams();
  if (id && id.startsWith(':')) {
    id = id.substring(1);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById",{ "empId": id });
        const data = response.data;
        if (data.status === "success") {
          setFormData(data.employee);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (id) {
      fetchData();
    }
    console.log(errors,formData)
  }, [id,setFormData]);

  const [currentPage, setCurrentPage] = useState(1);
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <JoiningForm/>;
      case 2:
        return <Education/>;
      case 3:
        return <Experience/>;
      case 4:
          return <BgvCheck/>;
      case 5:
          return <AssignRolesForm/>;
      default:
        return <JoiningForm/>;
    }
  };
  return (
      <View style={styles.Maincontainer}>
            <View style={styles.container}>
            <Pagination  setCurrentPage={setCurrentPage} />
            <View style={{height:'85vh',}}>
                {renderPage()}
            </View>
          </View>
    </View>
  );
};
export default Maincomponent;
const styles = StyleSheet.create({
  Maincontainer:{
    backgroundColor:'white',
    height:'100vh'
  },
  container: {
    flex: 1,
    width: '90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:20,
    borderRadius:20,
    marginBottom:10,
    backgroundColor: 'white', 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },});
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import Pagination from './Pagination';
// import JoiningForm from '../personaldetails/JoiningForm';
// import Education from '../education/Education';
// import Experience from '../experience/Experience';
// import { View, StyleSheet } from 'react-native';
// import AppProvider from '../../AppContext/AppContext';
// import AppContext from '../../AppContext/AppContext';
// import AssignRolesForm from '../rolemapping/AssignRoleForm';
// import axios from 'axios';

// const Maincomponent = () => {
//   const { id } = useParams();
//   console.log(id);
//   const [currentPage, setCurrentPage] = useState(1);
//   // const { formData, setFormData } = useContext(AppContext);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById", { params: { empId: id } });
//   //       const data = response.data;
//   //       if (data.status === "success") {
//   //         setFormData(data.employee);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };
//   //   if (id) {
//   //     fetchData();
//   //   }
//   // }, [id]);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 1:
//         return <JoiningForm />;
//       case 2:
//         return <Education />;
//       case 3:
//         return <Experience />;
//       case 4:
//         return <AssignRolesForm />;
//       default:
//         return <JoiningForm />;
//     }
//   };
//   return (
//     <AppProvider>
//       <View style={styles.Maincontainer}>
//         <View style={styles.container}>
//           <Pagination setCurrentPage={setCurrentPage} />
//           <View style={{ height: '85vh' }}>
//             {renderPage()}
//           </View>
//         </View>
//       </View>
//     </AppProvider>
//   );
// };

// export default Maincomponent;

// const styles = StyleSheet.create({
//   Maincontainer: {
//     backgroundColor: 'white',
//     height: '100vh'
//   },
//   container: {
//     flex: 1,
//     width: '90%',
//     marginLeft: '5%',
//     marginRight: '5%',
//     marginTop: 20,
//     borderRadius: 20,
//     marginBottom: 10,
//     backgroundColor: 'white',
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -10 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });
