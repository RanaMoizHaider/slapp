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
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { auth, getDatabase, ref, set } from "../../firebase";

const RegisterScreen = () => {
    const [displayName, setDisplayName] = useState("Testing");
    const [username, setUsername] = useState("testing");
    const [email, setEmail] = useState("ranamoizhaider@gmail.com");
    const [password, setPassword] = useState("123456");
    const [photoURL, setPhotoURL] = useState("https://source.unsplash.com/random/150x150");

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // const user = userCredentials.user;
                const user = userCredentials.user;
                console.log("Registered with ", user.email);
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                    photoURL: photoURL
                }).then(function () {
                    console.log("Profile updated successfully");
                }, function (error) {
                    console.log(error);
                });
                // console.log(user);
                const db = getDatabase();
                set(ref(db, 'users/' + user.uid), {
                    uid: user.uid,
                    displayName: displayName,
                    username: username,
                    email: email,
                    password: password,
                    photoURL: photoURL
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogIn = () => {
        navigation.pop();
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                    style={styles.input}
                    autoCompleteType="name"
                />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                    autoCompleteType="username"
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoCompleteType="email"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    autoCompleteType="password"
                    secureTextEntry
                />
                <TextInput
                    placeholder="Photo URL"
                    value={photoURL}
                    onChangeText={(text) => setPhotoURL(text)}
                    style={styles.input}
                    editable={false}
                    caretHidden={true}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogIn} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

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
