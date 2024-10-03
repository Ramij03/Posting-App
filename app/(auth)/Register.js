import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/SubmitButton';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Error message state
    const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar state

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setErrorMessage(""); // Reset error message

            // Validate input fields
            if (!name || !email || !password) {
                setErrorMessage("Please fill all fields"); // Set error message if fields are empty
                setLoading(false);
                return;
            }

            const {data}= await axios.post('http://192.168.1.12:8080/api/v1/auth/register',{name,email,password});
            console.log('Register Data ==>', { name, email, password });

            // Show snackbar for 5 seconds after successful registration
            setSnackbarVisible(true);
            setTimeout(() => {
                setSnackbarVisible(false);
                navigation.navigate("Login");
            }, 5000);

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pagetitle}>Register</Text>

            {/* Input fields */}
            <InputBox
                inputTitle={"Name"}
                value={name}
                setValue={setName}
            />
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
                btnTitle="Register"
                loading={loading}
                handleSubmit={handleSubmit}
            />

            {/* Navigation to Login */}
            <Text style={styles.linktext}>
                Already a User? {" "}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
                </Text>
            </Text>

            {/* Snackbar for success message */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={5000} // Show for 5 seconds
            >
                Registration successful!
            </Snackbar>
        </View>
    );
};

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
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red', // Error message color
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Register;
