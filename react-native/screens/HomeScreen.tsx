import React from "react";
import {Image, StyleSheet, View} from "react-native";

import { Wrapper } from "../components/layout/Wrapper";
import { RootTabScreenProps } from "../types";
import { Pressable, Text } from "react-native";

import GameCard from "../components/HomeScreen/GameCard";
import GameModeToggleSwitch from "../components/gamemodetoggle";
const wordleImg = require("../assets/images/homescreen/wordle_logo.png");
const bhImg = require("../assets/images/homescreen/behindBox_logo.png");
const gbImg = require("../assets/images/homescreen/gibberish_logo.png");
const logo = require("../assets/images/homescreen/logo.png");

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            backgroundColor: "#EAE8FB",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly"

        },
        logo: {
            alignItems: "center",
            width: "60%"
        },
        cardContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
        },
    })

    return (
        <Wrapper>
            <View style={styles.container}>
                    <Image resizeMode="contain" source={logo} style={styles.logo}/>
                <View style={styles.cardContainer}>
                    <GameCard cardTitle="Nordle" imageURL={wordleImg} description="Lær navnene ved å spille wordle 🥳" bgcolor="#FFD4BE"/>
                    <GameCard cardTitle="Behind Box" imageURL={bhImg} description="Hvem gjemmer seg bak boksen? 😱" bgcolor="#F9F871" />
                    <GameCard cardTitle="Gibberish" imageURL={gbImg} description="Ranger bokstavene" bgcolor="lightblue" />
                </View>
                <View>
                    <GameModeToggleSwitch />
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate("Game", { gameType: 'W' })}>
              <Text>Wordle</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Game", { gameType: 'B' })}>
              <Text>Behind the box</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Game", { gameType: 'G' })}>
              <Text>Hangman</Text>
            </Pressable>
        </Wrapper>
    );
};