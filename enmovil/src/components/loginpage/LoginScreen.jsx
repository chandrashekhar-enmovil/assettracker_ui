import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/app');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock authentication logic
    setTimeout(() => {
      if (email === 'user' && password === 'password') {
        login(email, 'your_token_here');
        setLoading(false);
        setSnackbarMessage('Login successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/app');
        },1000);
      } else {
        setLoading(false);
        setSnackbarMessage('Invalid credentials');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }, 500);
  };

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(-30)).current;
  const slideAnim2 = useRef(new Animated.Value(-30)).current;
  const slideAnim3 = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    Animated.stagger(200, [
      createAnimation(fadeAnim1, slideAnim1),
      createAnimation(fadeAnim2, slideAnim2),
      createAnimation(fadeAnim3, slideAnim3),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, slideAnim1, slideAnim2, slideAnim3]);

  const createAnimation = (fadeAnim, slideAnim) =>
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.loginSection}>
          <Animated.Text style={[styles.headerText, getAnimationStyle(fadeAnim1, slideAnim1)]}>
            Hello, Admin
          </Animated.Text>
          <Animated.Text style={[styles.subHeaderText, getAnimationStyle(fadeAnim1, slideAnim1)]}>
            Welcome back, Please login to your account
          </Animated.Text>
          <Animated.View style={getAnimationStyle(fadeAnim2, slideAnim2)}>
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>
          <Animated.View style={getAnimationStyle(fadeAnim2, slideAnim2)}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="black"
              value={password}
              onChangeText={setPassword}
            />
          </Animated.View>
          <Animated.View style={getAnimationStyle(fadeAnim3, slideAnim3)}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <View style={styles.gradientButton}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign in</Text>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </View>
  );
};

const getAnimationStyle = (fadeAnim, slideAnim) => ({
  opacity: fadeAnim,
  transform: [{ translateY: slideAnim }],
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  left: {
    borderTopStartRadius: '30%',
    borderRadius: 15,
    width: '100vh',
    padding: 70,
    justifyContent: 'center',
    backgroundColor: '#060826',
  },
  loginSection: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.4,
    marginBottom: 20,
  },
  inputField: {
    height: 46,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginTop: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 4,
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to right, #d93280 0%, #44118c 110%)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
