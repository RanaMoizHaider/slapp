import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref as refd, onValue, set } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import styles from "./ProfileStyles";
import Seperator from '../components/Separator';
const db = getDatabase();

const ProfileScreen = (props) => {

    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [uploading, setUploading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    const setUser = () => {
        onValue(refd(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            setCurrentUser(snapshot.val());
            setDisplayName(currentUser?.displayName);
            setUsername(currentUser?.username);
            setEmail(currentUser?.email);
            setPhotoURL(currentUser?.photoURL);
        });
    }

    useEffect(() => {
        setUser();
    }, []);

    const takePhoto = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera permissions to make this work!");
            }
            else {
                let pickerResult = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                });

                console.log({ pickerResult });
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

            if (!pickerResult.canceled) {
                const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
                setPhotoURL(uploadUrl);
                updateImage(uploadUrl);
                console.log("The Upload URL is " + uploadUrl);
                console.log("The Image is " + photoURL);
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
        <ScrollView style={styles.container} nestedScrollEnabled={true}>
            {/* header image */}
            <View style={styles.pictureWrapper}>
                <Image
                    style={{ height: "100%", width: "100%" }}
                    source={{
                        uri: currentUser?.photoURL
                    }}
                />
            </View>
            <View style={styles.picUpdateButtonBox}>
                <TouchableOpacity style={styles.picUpdateButton} onPress={takePhoto}>
                    <Text style={styles.picUpdateButtonText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picUpdateButton} onPress={pickImage}>
                    <Text style={styles.picUpdateButtonText}>Upload Picture</Text>
                </TouchableOpacity>
            </View>
            {/* Username heading after picture */}
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>@{currentUser?.username}</Text>
            </View>

            <Seperator />

            <View style={styles.inputContainer}>
                <Text style={styles.detailText1}>Name</Text>
                <TextInput
                    placeholder="Name"
                    value={currentUser?.displayName}
                    onChangeText={(text) => setDisplayName(text)}
                    style={styles.input}
                    autoCompleteType="name"
                />
                <Text style={styles.detailText1}>Email</Text>
                <TextInput
                    placeholder="Email"
                    value={currentUser?.email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoCompleteType="email"
                />
                <TouchableOpacity onPress={() => { }} style={styles.button} >
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>

            <Seperator />

            <View style={styles.inputContainer}>
                <Text style={styles.detailText1}>Old Password</Text>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    autoCompleteType="password"
                    secureTextEntry
                />
                <Text style={styles.detailText1}>New Password</Text>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    autoCompleteType="password"
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => { }} style={styles.button} >
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>
            </View>

            {/* <Seperator />

            <View style={styles.mapWrapper}>
                <View style={styles.seperatorWrapper}>
                    <Seperator />
                </View>
                <View style={styles.detailLinksWrapper}>
                    <View style={styles.linkIconWrapper}>
                        <Image
                            style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                            source={{
                                uri: photoURL
                            }}
                        />
                    </View>
                    <View style={styles.linkTextWrapper}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com/")}>
                            <Text style={styles.linksStyles}>See On Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.uniWebWrapper}>
                <View style={styles.seperatorWrapper}>
                    <Seperator />
                </View>
                <View style={styles.detailLinksWrapper}>
                    <View style={styles.linkIconWrapper}>
                        <Image
                            style={{ height: "100%", width: "100%", resizeMode: "center" }}
                            source={{
                                uri: photoURL
                            }}
                        />
                    </View>
                    <View style={styles.linkTextWrapper}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com/")}>
                            <Text style={styles.linksStyles}>{currentUser?.username}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}

        </ScrollView>
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
