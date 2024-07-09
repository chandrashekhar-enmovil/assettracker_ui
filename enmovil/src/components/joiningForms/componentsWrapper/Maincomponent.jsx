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
import { useAuth } from '../../authcontext/AuthContext';
const Maincomponent = () => {
  const { formData,setFormData} = useContext(AppContext);
  const {user}=useAuth();
  var {id}=useParams();
  if (id && id.startsWith(':')) {
    id = id.substring(1);  
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://216.48.185.128:3001/assetEmp/getEmployeeDetailsById",{"empId":id});
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
              <Pagination  setCurrentPage={setCurrentPage} role={user.role}/>
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
    flex:1,
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
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },});
