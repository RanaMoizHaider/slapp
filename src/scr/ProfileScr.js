import * as ImagePicker from "expo-image-picker"
import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/core"
import { Button, Text, Image, View, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native"
import { Avatar, List } from "react-native-paper"
// import { Avatar } from 'react-native-elements'
// import UserAvatar from 'react-native-user-avatar'
import "react-native-get-random-values"
import { v4 as uuidv4 } from 'uuid'
import { styles, themeBackground } from "../components/Style"
import Seperator from '../components/Separator'
import { auth, db, updateProfile, refd, onValue, set, getStorage, ref, uploadBytes, getDownloadURL, onAuthStateChanged } from "../../firebase"

const ShowProfile = (props) => {
    const navigation = useNavigation()

    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [uploading, setUploading]     = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [username, setUsername]       = useState("")
    const [email, setEmail]             = useState("")
    const [password, setPassword]       = useState("")
    const [npassword, setNPassword]     = useState("")
    const [photoURL, setPhotoURL]       = useState("")

    const setUser = () => {
        onValue(refd(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            setCurrentUser(snapshot.val())
            setDisplayName(currentUser?.displayName)
            setUsername(currentUser?.username)
            setEmail(currentUser?.email)
            setPhotoURL(currentUser?.photoURL)
        })
    }

    useEffect(() => {
        setUser()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                props.setAvailable(true)
            } else {
                props.setAvailable(false)
            }
        })
    }, [])

    const takePhoto = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== "granted") {
                alert("Sorry, we need camera permissions to make this work!")
            }
            else {
                let pickerResult = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                })

                console.log({ pickerResult })
                handleImagePicked(pickerResult)
            }
        }
    }

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
            else {
                let pickerResult = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                })

                // console.log({ pickerResult })
                handleImagePicked(pickerResult)
            }
        }
    }

    const handleImagePicked = async (pickerResult) => {
        try {
            // console.log("handleImagePicked function started")
            setUploading(true)

            if (!pickerResult.canceled) {
                const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri)
                setPhotoURL(uploadUrl)
                updateImage(uploadUrl)
                // console.log("The Upload URL is " + uploadUrl)
                // console.log("The Image is " + photoURL)
            }
        } catch (e) {
            // console.log(e)
            // alert("Upload failed, sorry :(")

            Alert.alert('Error', "Upload failed, sorry :(", [
                { text: 'OK', onPress: () => console.log('Failed Upload OK Pressed') },
            ])
        } finally {
            setUploading(false)
        }
    }

    const updateImage = (uploadUrl) => {

        updateProfile(auth.currentUser, {
            photoURL: uploadUrl
        }).then(function () {
            // console.log("Profile Pic successfully uploaded")
            set(refd(db, 'users/' + auth.currentUser.uid), {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                username: currentUser.username,
                email: currentUser.email,
                password: currentUser.password,
                photoURL: uploadUrl
            })
            setUser()
        }, function (error) {
            console.log(error)
        })
    }

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                // navigation.replace("Login")
                props.setAvailable(false)
            })
            .catch((err) => {
                Alert.alert('Logged Out', err.code, [
                    { text: err.code, onPress: () => console.log(err) },
                ])
            })
    }

    return (
        <ScrollView style={styles.ssContainer} nestedScrollEnabled={true}>
            {/* header image */}
            <View style={[styles.pictureWrapper, styles.container]}>
                {/* <Image
                    style={styles.avatar}
                    source={{
                        uri: currentUser?.photoURL
                    }}
                /> */}
                <Avatar.Image
                    // style={styles.avatar}
                    style={{ backgroundColor: themeBackground }}
                    source={{
                        uri: currentUser?.photoURL
                    }}
                    size={200}
                />
                {/* <Avatar
                    title={currentUser?.displayName}
                    source={{ uri: currentUser?.photoURL }}
                /> */}
                {/* <UserAvatar size={100} name={currentUser?.displayName} src={{ uri: currentUser?.photoURL }} /> */}
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
            {/* <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>@{currentUser?.username}</Text>
            </View> */}

            {/* <Seperator /> */}

            <View style={[styles.inputContainer]}>
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
                {/* <TouchableOpacity onPress={() => { }} style={styles.button} >
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity> */}
            </View>

            <View style={styles.inputContainer}>
                {/* <Text style={styles.detailText1}>Old Password</Text>
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
                    value={npassword}
                    onChangeText={(text) => setNPassword(text)}
                    style={styles.input}
                    autoCompleteType="password"
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => { }} style={styles.button} >
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton} >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.inputContainer}>
                <TouchableOpacity onPress={handleSignOut} style={styles.button} >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View> */}

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
    )

}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            console.log(e)
            reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", uri, true)
        xhr.send(null)
    })

    const fileRef = ref(getStorage(), uuidv4())
    const result = await uploadBytes(fileRef, blob)

    // We're done with the blob, close and release it
    blob.close()

    return await getDownloadURL(fileRef)
}

function AskLogin() {
    const navigation = useNavigation()
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Login to view your profile</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const ProfileScr = (props) => {
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
            { available ? <ShowProfile available={available} setAvailable={setAvailable} /> : <AskLogin />}

        </View>
    )
}

export default ProfileScr
