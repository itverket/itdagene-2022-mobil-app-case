import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { FlashCardComponent } from "../components/games/FlashCardComponent";
import Header from "../components/layout/Header";
import { Wrapper } from "../components/layout/Wrapper";
import { Loading } from "../components/status/Loading";
import { GameContext } from "../context/GameContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootStackScreenProps } from "../types";
import shuffleArray from "../util/shuffleArray";
import BehindBoxScreen from "./BehindBoxScreen";
import WordleScreen from "./WordleScreen";

export const GameScreen = ({
	route: {
		params: { gameType },
	},
}: RootStackScreenProps<"Game">) => {
	const [isNormalPlay, setIsNormalPlay] = useState<boolean>(false);
	
	const { gameMode, setEmployees } = useContext(GameContext);
	const { loading, employees } = useFetchEmployees();

	useEffect(() => {
		if (gameMode === GameMode.evaluation) {
			setIsNormalPlay(true);
		} else {
			setIsNormalPlay(false);
		}
		if (employees) {
			setEmployees(shuffleArray(employees));
		}
	}, [gameMode, employees]);

	const getContent = () => {
		switch (gameType) {
			case "W":
				return <WordleScreen />;
			case "B": 
				return <BehindBoxScreen />;
			default:
				return <Text>Default</Text>;
		}
	};

    return (
        <Wrapper>
            <Header />
            {loading && <Loading />}
            {!isNormalPlay && employees && <FlashCardComponent setIsNormalPlay={setIsNormalPlay} />}
            {isNormalPlay && getContent()}
        </Wrapper>
    );
};
