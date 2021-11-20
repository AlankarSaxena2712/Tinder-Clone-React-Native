import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect, useRef } from 'react'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import tw from "tailwind-rn"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
    {
        id: 123,
        firstName: "Alankar",
        lastName: "Saxena",
        job: "Software Developer",
        photoURL: "https://randomuser.me/api/portraits/men/17.jpg",
        age: 27,
    },
    {
        id: 456,
        firstName: "Emma",
        lastName: "Stone",
        job: "Software Developer",
        photoURL: "https://randomuser.me/api/portraits/women/27.jpg",
        age: 25,
    },
    {
        id: 789,
        firstName: "Laly",
        lastName: "Richard",
        job: "Software Developer",
        photoURL: "https://randomuser.me/api/portraits/women/42.jpg",
        age: 23,
    },
]

const HomeScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const swipeRef = useRef(null);

    return (
        <SafeAreaView style={tw("flex-1")}>
            <View style={tw("items-center relative flex-row justify-between px-5 pt-2")}>
                <TouchableOpacity onPress={logout}>
                    <Image style={tw('h-10 w-10 rounded-full')} source={{uri: user.photoURL}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={tw('h-10 w-10 rounded-full')} source={require("../logo.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={30} color="#ff5864" />
                </TouchableOpacity>
            </View>

            <View style={tw("flex-1 -mt-6")}>
                <Swiper 
                    ref={swipeRef}
                    containerStyle={{backgroundColor: "transparent"}}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    onSwipedLeft={() => {
                        console.log("Swipe NOPE")
                    }}
                    onSwipedRight={() => {
                        console.log("Swipe Match")
                    }}
                    backgroundColor={"#4fd0e9"}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "#4ded30",
                                },
                            },
                        },
                    }}
                    verticalSwipe={false}
                    renderCard={card => (
                        <View key={card.id} style={tw("relative bg-white h-4/5 rounded-xl")}>
                            <Image source={{uri: card.photoURL}} style={tw("h-full w-full rounded-xl")} />
                            <View style={[tw("bg-white w-full h-20 absolute bottom-0 justify-between px-6 py-2 items-between flex-row rounded-b-xl"), styles.cardShadow,]}>
                                <View>
                                    <Text style={tw("text-xl font-bold")}>{card.firstName} {card.lastName}</Text>
                                    <Text>{card.job}</Text>
                                </View>
                                <View>
                                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={tw("flex flex-row justify-evenly mb-5")}>
                <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
                    <Entypo name="cross" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
                    <Entypo name="heart" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});
