import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    return (
        <View>
            <Text>{loading?"loading....": "Login to view the app"}</Text>
            <Button title="login" onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen
