import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Employeee from '../displayGrid/Employeee';
import Form from './Form';
const Employee = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gridView}>
            <View style={styles.heading} >
                <Text style={styles.heading}>Employees</Text>
            </View>
            <View style={styles.buttons}>
                <Form/>
            </View>
      </View>
        <Employeee/>
     </View>
  )
}
export default Employee
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    gridView:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        position: 'sticky'
    },
    name:{
        textAlign:'center',
        fontSize:12,
    },
    heading:{
        fontWeight:'bold',
        padding:10,
        //marginLeft:20,
        fontSize:25,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
    },
    buttonItems:{
        backgroundColor:'#196342',
        color:'white',
        borderRadius:20,
        margin:5,
        padding:5,
    },
    NameItems:{
        color:'white',
        fontSize:12,
    }
    },
);