import React from "react";
import {View} from "react-native";

import { Text } from "../components/Themed";
import GameCard from "../components/HomeScreen/GameCard";
// @ts-ignore
import wordleImg from "../assets/images/homescreen/wordle_logo.png";
import bhImg from "../assets/images/homescreen/behindBox_logo.png";

export const HomeScreen = () => {


    return (
        <View>
            <GameCard cardTitle="Nordle" imageURL={wordleImg} description="Lær navnene ved å spille wordle 🥳" bgcolor="#FFD4BE"/>
            <GameCard cardTitle="Behind Box" imageURL={bhImg} description="Hvem gjemmer seg bak boksen? 😱" bgcolor="#F9F871" />
        </View>
    );
};
