import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Pagination = ({ setCurrentPage, role }) => {
  const [activeButton, setActiveButton] = useState(1);

  const handlePress = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setCurrentPage(buttonIndex);
  };
  const pageNames = role === 'admin'
    ? ['Personal Details', 'Education', 'Experience', 'Background check', 'RoleMapping']
    : ['Personal Details', 'Education', 'Experience', 'Background check'];

  return (
    <View style={styles.main}>
      {pageNames.map((name, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            activeButton === index + 1 ? styles.activeButton : styles.inactiveButton,
            { width: role === 'admin' ? '19%' : '24%' }
          ]}
          onPress={() => handlePress(index + 1)}
        >
          <Text style={[
            styles.buttonText,
            activeButton === index + 1 ? styles.buttonTextActive : styles.buttonText
          ]}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default Pagination;
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#bfc2c7',
    borderEndColor: 'blue',
    borderBottomWidth: 3,
    color: 'black',
  },
  inactiveButton: {
    backgroundColor: '#c3d6c8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextActive: {
    color: 'black',
  },
});
