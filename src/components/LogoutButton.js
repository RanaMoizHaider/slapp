import { useNavigation } from "@react-navigation/core"
import { auth } from "../../firebase"
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'


const LogoutButton = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch((err) => {
                Alert.alert('Error', err.code, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
            })
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    )
}

export default LogoutButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#0782F9",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        alignContent: "flex-end",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})
