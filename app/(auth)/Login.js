import React, {useState, useContext} from 'react';
import { AuthContext } from '../../context/authContext';
import { StyleSheet, View, Text } from 'react-native';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/SubmitButton';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    //global state
    const [state, setState]= useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Error message state
    const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar state

    const handleSubmit = async() => {
      try {
        setLoading(true);
        setErrorMessage(""); // Reset error message
        if (!email || !password) {
            setErrorMessage("Please fill all fields"); // Set error message if fields are empty
            setLoading(false);
            return;
        }
        const {data}= await axios.post('http://localhost:8080/api/v1/auth/login',{email,password});
        setState(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data)); //Storing user data locally for later use
        console.log('Login Data ==>', {email, password});
        
        // Show snackbar for 5 seconds after successful login
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
          navigation.navigate("Home");
        }, 5000);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    //temp function to check local storage data
    const getLocalData= async () =>{
      let data = await AsyncStorage.getItem('@auth');
      console.log('Local Data ==>', value);
    };
    getLocalData();
    return (
      <View style={styles.container}>
        <Text style={styles.pagetitle}>Login</Text>

        {/* Input fields */}
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />

        {/* Display error message if any */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Submit button */}
        <SubmitButton
          btnTitle="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />

        {/* Navigation to Register */}
        <Text style={styles.linktext}>
          Don't Have An Account{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>

        {/* Snackbar for success message */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={5000} // Show for 5 seconds
        >
          User logged in successfully!
        </Snackbar>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#888684FF',
    },
    pagetitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e2225',
        marginBottom: 20,
    },
    linktext: {
        textAlign: 'center',
    },
    link: {
        color: '#C41220FF',
        fontSize: 15,
        textDecorationLine:'underline'
    },
    errorText: {
        color: 'red', // Error message color
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Login;
