import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { auth } from "../../firebase"
import { styles } from "../components/Style"

const LoginScr = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        navigation.replace("Register")
    }

    const handleForget = () => {
        navigation.replace("ForgetPass")
    }

    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log("Logged In with", user.email)
            })
            .catch((err) => {
                Alert.alert('Error', err.code, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
            })
    }

    return (
        <KeyboardAvoidingView style={styles.centerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.loginInputContainer}>
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

            <View style={{alignItems: 'flex-end'}}>
                <Button title="Forgor Password?" onPress={handleForget} />
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
    )
}

export default LoginScr