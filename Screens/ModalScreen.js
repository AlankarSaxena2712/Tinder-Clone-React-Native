import { serverTimestamp, setDoc, doc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "tailwind-rn";
import { db, storage } from '../Firebase';
import useAuth from '../hooks/useAuth';
import * as IamgePicker from "expo-image-picker"
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

const ModalScreen = () => {

    const { user } = useAuth();
    const navigation = useNavigation()
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(false);

    const incompleteForm = !image || !job || !age;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Update your profile",
            headerStyle: {
                backgroundColor: "#ff5864",
            },
            headerTitleStyle: {
                color: "white",
            },
            headerTintColor: "white",
        })
    })

    useEffect(async () => {
        if (Platform.OS !== "web") {
            const { status } = await IamgePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Permission denied!!!")
            }
        }
    }, []);

    const PickImage = async () => {
        let result = await IamgePicker.launchImageLibraryAsync({
            mediaTypes: IamgePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })
        if (!result.concelled) {
            uploadImage(result.uri, user.displayName)
        }
    }

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `Images/${imageName}`);

        uploadBytes(storageRef, blob)
        getDownloadURL(ref(storage, `Images/${imageName}`)).then((url) => {
            setImage(url);
            setImageUploaded(true);
        });
    }

    const updateUserProfile = () => {
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        }).then(() => {
            navigation.navigate("Home")
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <SafeAreaView style={tw("flex-1")}>
            <KeyboardAvoidingView style={tw('flex-1 -mt-6')}>
                <ScrollView contentContainerStyle={[tw("items-center"), {flexGrow: 1}]}>
                    <Image
                        style={tw("h-20 w-full")}
                        resizeMode="contain"
                        source={{uri: "https://links.papareact.com/2pf"}}
                    />

                    <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>Welcome {user.displayName}</Text>

                    <Text style={tw("text-center text-red-400 p-4 font-bold")}>Step 1: The Profile Pic</Text>
                    <TouchableOpacity 
                        style={[
                            tw("w-44 p-2 rounded-xl bg-red-400"),
                            imageUploaded ? tw("bg-green-300") : tw("bg-red-400"),
                        ]}
                        onPress={PickImage}
                    >
                        <Text style={[
                                tw("text-center text-white text-base font-bold"),
                                imageUploaded ? tw("text-black") : tw("text-white"),
                            ]}>
                            {imageUploaded ? "Uploaded" : "Upload Profile pic"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={tw("text-center text-red-400 p-4 font-bold")}>Step 2: The Job</Text>
                    <TextInput
                        value={job}
                        onChangeText={setJob}
                        style={tw("text-center text-xl pb-2")}
                        placeholder="Enter your occupation"
                    />

                    <Text style={tw("text-center text-red-400 p-4 font-bold")}>Step 3: The Age</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={age}
                        onChangeText={setAge}
                        style={tw("text-center text-xl pb-2")}
                        placeholder="Enter your age"
                        maxLength={2}
                        minLength={2}
                    />

                    <TouchableOpacity 
                        disabled={incompleteForm}
                        style={[tw("w-64 p-3 rounded-xl mt-10 mb-5 bg-red-400"),
                            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                        ]}
                        onPress={updateUserProfile}
                    >
                        <Text style={tw("text-center text-white font-bold text-xl")}>Update Profile</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ModalScreen
