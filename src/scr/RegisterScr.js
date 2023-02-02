import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    sendEmailVerification
} from "firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { styles } from '../components/Style'
import { auth, getDatabase, refd, set } from "../../firebase"

const RegisterScr = () => {
    const [displayName, setDisplayName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [photoURL, setPhotoURL] = useState("https://firebasestorage.googleapis.com/v0/b/allinone-69.appspot.com/o/6af6a9c4-fab5-4b62-a011-84e6c18a7787?alt=media&token=2f49b244-91db-44bc-a5fd-a0d2875f6841")

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.goBack()
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log("Registered with ", user.email)
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                    photoURL: photoURL
                }).then(function () {
                    console.log("Profile updated successfully")
                }, function (error) {
                    console.log(error)
                })
                // console.log(user)
                const db = getDatabase()
                set(refd(db, 'users/' + user.uid), {
                    uid: user.uid,
                    displayName: displayName,
                    email: email,
                    password: password,
                    photoURL: photoURL
                })
                sendEmailVerification(user)
                    .then(() => {
                        // Alert.alert("Verification mail sent", [
                        //     { text: 'OK', onPress: () => console.log('OK Pressed') },
                        // ])
                        console.log('Verification mail sent')
                    });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleLogIn = () => {
        navigation.replace("Login")
    }

    return (
        <KeyboardAvoidingView style={styles.centerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.loginInputContainer}>
                <TextInput
                    placeholder="Full Name"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                    style={styles.input}
                    autoCompleteType="name"
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
    )
}

export default RegisterScr