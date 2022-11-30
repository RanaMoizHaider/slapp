import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import { getDatabase, ref as refd, onValue } from "firebase/database";

const HomeScreen = () => {

    const [currentUser, setCurrentUser] = useState([]);

    const setUser = () => {
        onValue(refd(getDatabase(), 'users/' + auth.currentUser.uid), (snapshot) => {
            setCurrentUser(snapshot.val());
            // console.log("User is set now.");
            // console.log(snapshot.val());
        });
    }

    useEffect(() => {
        setUser();
    }, []);

    const navigation = useNavigation();

    const handleProfile = () => {
        navigation.navigate("Profile", currentUser);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleProfile}>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <Button
                onPress={() => navigation.navigate('ProfileModel')}
                title="ProfileModel"
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#0782F9",
        width: "60%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
});
