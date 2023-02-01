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
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth"
import { useNavigation } from "@react-navigation/core"
import { auth } from "../../firebase"
import { styles } from "../components/Style"

const ForgetPassScr = () => {
  const [email, setEmail] = useState("")

  const navigation = useNavigation()

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              navigation.goBack()
          }
      })
      return unsubscribe
  }, [])

  const handleLogIn = () => {
      navigation.replace("Login")
  }

    const handleForgot = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.replace("Login")
            })
            .catch((error) => {
                console.log(error)
            })
    }

  return (
      <KeyboardAvoidingView style={styles.centerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.loginInputContainer}>
              <TextInput
                  placeholder="Enter registered email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
              />
          </View>

          <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleForgot} style={styles.button}>
                  <Text style={styles.buttonText}>Send Reset Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={handleLogIn}
                  style={[styles.button, styles.buttonOutline]}
              >
                  <Text style={styles.buttonOutlineText}>Back to Login</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
  )
}

export default ForgetPassScr