import { FC } from "react";
import { Text, View } from "react-native";
import { Wrapper } from "../components/layout/Wrapper";
import { RootStackScreenProps } from "../types";
import WordleScreen from "./WordleScreen";

export const GameScreen = ({
	navigation,
	route: {
		params: { gameType },
	},
}: RootStackScreenProps<"Game">) => {
	console.log(gameType);
	return <Wrapper>{gameType === "W" && <WordleScreen />}</Wrapper>;
};
