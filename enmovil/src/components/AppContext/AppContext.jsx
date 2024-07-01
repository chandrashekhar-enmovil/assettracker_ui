import React, { createContext} from 'react';
import Appdata from './Appdata'
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const { errors, setErrors, formData, setFormData } = Appdata();
  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <AppContext.Provider value={{ formData,setFormData, updateFormData,errors,setErrors }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
