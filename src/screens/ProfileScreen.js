import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref as refd, onValue, set } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
const db = getDatabase();

const ProfileScreen = (props) => {

    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState("");

    const setUser = () => {
        onValue(refd(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            setCurrentUser(snapshot.val());
            // console.log("User is set now.");
            // console.log(snapshot.val());
        });
    }

    useEffect(() => {
        setUser();
    }, []);

    const takePhoto = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera permissions to make this work!");
            }
            else {
                let pickerResult = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                });

                // console.log({ pickerResult });
                handleImagePicked(pickerResult);
            }
        }
    };

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
            else {
                let pickerResult = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                });

                // console.log({ pickerResult });
                handleImagePicked(pickerResult);
            }
        }
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            console.log("handleImagePicked function started")
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                setImage(uploadUrl);
                updateImage(uploadUrl);
                console.log("The Upload URL is " + uploadUrl);
                console.log("The Image is " + image);
            }
        } catch (e) {
            // console.log(e);
            // alert("Upload failed, sorry :(");

            Alert.alert('Error', "Upload failed, sorry :(", [
                { text: 'OK', onPress: () => console.log('Failed Upload OK Pressed') },
            ]);
        } finally {
            setUploading(false);
        }
    };

    const updateImage = (uploadUrl) => {

        updateProfile(auth.currentUser, {
            photoURL: uploadUrl
        }).then(function () {
            console.log("Profile Pic successfully uploaded");
            set(refd(db, 'users/' + auth.currentUser.uid), {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                username: currentUser.username,
                email: currentUser.email,
                password: currentUser.password,
                photoURL: uploadUrl
            });
            setUser();
        }, function (error) {
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: auth.currentUser?.photoURL }} style={{ width: 250, height: 250 }} />
            {/* <Image source={{ uri: image }} style={{ width: 250, height: 250 }} /> */}
            <Text>Email: {currentUser?.email}</Text>
            <Text>Display Name: {currentUser?.displayName}</Text>
            <Text>Username: {currentUser?.username}</Text>
            <Text>Email Verification Status: {auth.currentUser?.emailVerified}</Text>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Upload Picture</Text>
            </TouchableOpacity>
        </View>
    );

};

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuidv4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}

export default ProfileScreen;

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
