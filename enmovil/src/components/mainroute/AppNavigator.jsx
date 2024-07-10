import React, { useState } from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import Employee from '../displayEmployee/Employee';
import Maincomponent from '../joiningForms/componentsWrapper/Maincomponent';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAuth } from '../authcontext/AuthContext';
import Employeee from '../displayGrid/Employeee';
import { AppProvider } from '../AppContext/AppContext';
import Experience from '../joiningForms/experience/Experience';
import Education from '../joiningForms/education/Education';
import JoiningForm from '../joiningForms/personaldetails/JoiningForm';
import AssignRolesForm from '../joiningForms/rolemapping/AssignRoleForm';
import BgvCheck from '../joiningForms/bgvcheck/BgvCheck';
const AppNavigator = () => {
  const { logout } = useAuth();
  const [activeButton, setActiveButton] = useState(1);
  const handlePress = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.navView}>
        <TouchableOpacity onPress={() => handlePress(1)} style={styles.navItem}>
          <Link to="/app/employees" style={styles.link}>
            <View style={activeButton === 1 ? styles.bg : ''}>
              <GroupAddIcon style={activeButton === 1 ? styles.activeIcon : styles.icon} />
              <Text style={activeButton === 1 ? styles.activeText : styles.name}>Employees</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(2)} style={styles.navItem}>
          <Link to="/app/assets" style={styles.link}>
            <View>
              <NoteAddIcon style={activeButton === 2 ? styles.activeIcon : styles.icon} />
              <Text style={activeButton === 2 ? styles.activeText : styles.name}>Assets</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { handlePress(3); logout(); }} style={styles.navItem}>
          <View>
            <LogoutIcon style={activeButton === 3 ? styles.activeIcon : styles.icon} />
            <Text style={activeButton === 3 ? styles.activeText : styles.name}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.gridView}>
        <Routes>
          <Route path="employees" element={<Employee />} />
          <Route path="assets" element={<Employeee />} />
          <Route path="joiningforms" element={<AppProvider><Maincomponent /></AppProvider>} />
          <Route path="*" element={<Employee />} />
          <Route path="/editform/:id" element={<AppProvider><Maincomponent /></AppProvider>} />
          <Route path="/joiningform" element={<AppProvider><JoiningForm /></AppProvider>} />
          <Route path="/education" element={<AppProvider><Education /></AppProvider>} />
          <Route path="/experience" element={<AppProvider><Experience /></AppProvider>} />
          <Route path="/assignrolesform" element={<AppProvider><AssignRolesForm /></AppProvider>} />
          <Route path="/bgvcheck" element={<AppProvider><BgvCheck /></AppProvider>} />
        </Routes>
      </View>
    </View>
  );
};
export default AppNavigator;
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    height: '100vh',
  },
  navView: {
    width: '10vh',
    borderRightWidth: 2,
    borderRightColor: 'black',
    backgroundColor: 'white',
    marginRight: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'none',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 20,
    color: 'black',
  },
  activeIcon: {
    color: '#8da374',
    width: 30,
    height: 30,
    margin: 20,
  },
  name: {
    textAlign: 'center',
    color: 'black',
  },
  activeText: {
    textAlign: 'center',
    color: '#8da374',
  },
  gridView: {
    width: '95%',
  },
});