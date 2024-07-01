// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './components/authcontext/AuthContext';
// import AppNavigator from './AppNavigator';
// // import LoginScreen from './components/AppContext/loginpage/LoginScreen'
// import PrivateRoute from './components/authcontext/PrivateRoute';
// import LoginScreen from './components/loginpage/LoginScreen';

// const App = () => {
//    const { isAuthenticated } = useAuth();
//   //  console.log(isAuthenticated);
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to={isAuthenticated ? "/app" : "/login"} />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/app/*" element={<PrivateRoute element={AppNavigator} />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/authcontext/AuthContext';
import AppNavigator from './components/mainroute/AppNavigator';
import PrivateRoute from './components/authcontext/PrivateRoute';
import LoginScreen from './components/loginpage/LoginScreen';
import { AppProvider } from './components/AppContext/AppContext';

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/app" : "/login"} />;
};

const App = () => {
  return (
    <AuthProvider>
          <Router>
            <Routes>
              <Route path="*" element={<HomeRedirect />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/app/*" element={<PrivateRoute element={AppNavigator} />}/>
            </Routes>
          </Router>
    </AuthProvider>
  );
};

export default App;
