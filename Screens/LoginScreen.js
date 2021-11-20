import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react'
import { View, Text, Button, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from "tailwind-rn";

const LoginScreen = () => {
    
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    return (
        <View style={tw('flex-1')}>
            <ImageBackground 
                source={{uri: "https://tinder.com/static/tinder.png"}}
                style={tw('flex-1')}
                resizeMode="cover"
            >
                <TouchableOpacity
                    onPress={signInWithGoogle} 
                    style={[
                        tw("absolute bottom-20 p-4 rounded-2xl bg-white w-52"),
                        { marginHorizontal:"25%"}
                    ]}
                >
                    {loading ?
                        <ActivityIndicator size={19} color="#ff5864" />
                    :
                        <Text style={tw('text-center font-semibold')}>
                            Sign in & get swiping
                        </Text>
                    }
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen
