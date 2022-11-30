import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { auth } from "../../firebase";

const LoginScreen = () => {
    const [email, setEmail] = useState("ranamoizhaider@gmail.com");
    const [password, setPassword] = useState("123456");

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("AfterLogIn");
            }
        });
        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        navigation.push("Register");
    };

    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged In with", user.email);
            })
            .catch((err) => {
                // alert(err.message);
                Alert.alert('Error', err.code, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogIn} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
});
