import React from "react";
import { Wrapper } from "../components/layout/Wrapper";
import { RootTabScreenProps } from "../types";
import { Pressable, Text } from "react-native";

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {

  return (
    <Wrapper>
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
