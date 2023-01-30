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
    updateProfile
} from "firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { styles } from '../components/Style'
import { auth, getDatabase, ref, set } from "../../firebase"

const RegisterScr = () => {
    const [displayName, setDisplayName] = useState("Testing")
    const [username, setUsername] = useState("testing")
    const [email, setEmail] = useState("ranamoizhaider@gmail.com")
    const [password, setPassword] = useState("123456")
    const [photoURL, setPhotoURL] = useState("https://source.unsplash.com/random/150x150")

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
                set(ref(db, 'users/' + user.uid), {
                    uid: user.uid,
                    displayName: displayName,
                    username: username,
                    email: email,
                    password: password,
                    photoURL: photoURL
                })
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
    )
}

export default RegisterScr