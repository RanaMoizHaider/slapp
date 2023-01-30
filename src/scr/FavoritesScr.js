import React, { useState, useEffect } from "react"
import { Button, Text, View } from 'react-native'
import { useNavigation } from "@react-navigation/core"
import { auth, db, updateProfile, refd, onValue, set, getStorage, ref, uploadBytes, getDownloadURL, onAuthStateChanged } from "../../firebase"
import { styles } from "../components/Style"

const ShowFavorites = (props) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    return (
        <View style={styles.centerContainer}>
            <Text>
                No Favorites Added
            </Text>
        </View>
    )
}

function AskLogin() {
    const navigation = useNavigation()
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Login to view your favorites</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const FavoritesScr = (props) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [available, setAvailable] = useState(false)
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAvailable(true)
        } else {
            setAvailable(false)
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            { available ? <ShowFavorites available={available} setAvailable={setAvailable} /> : <AskLogin />}

        </View>
    )
}

export default FavoritesScr