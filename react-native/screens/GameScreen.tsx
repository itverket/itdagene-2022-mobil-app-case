import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { FlashCardComponent } from "../components/games/FlashCardComponent";
import { Wrapper } from "../components/layout/Wrapper";
import { GameContext } from "../context/GameContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootStackScreenProps } from "../types";
import WordleScreen from "./WordleScreen";

export const GameScreen = ({ route: { params: { gameType }} }: RootStackScreenProps<"Game">) => {
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(false);
    const {gameMode, setEmployees} = useContext(GameContext);
    const {loading, employees, error} = useFetchEmployees();

    useEffect(() => {
        if (gameMode === GameMode.evaluation) {
            setIsNormalPlay(true);
        } else {
            setIsNormalPlay(false);
        }
        if (employees) {
            setEmployees(employees);
        }

    }, [gameMode, employees]);

    const getContent = () => {
        switch (gameType) {
            case "W":
                return <WordleScreen />;
            default: 
                return <Text>Default</Text>
        }
    }

    return (
        <Wrapper>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {!isNormalPlay && <FlashCardComponent setIsNormalPlay={setIsNormalPlay} />}
            {isNormalPlay && getContent()}
        </Wrapper>
    );
};

