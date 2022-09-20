import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { FlashCardComponent } from "../components/games/FlashCardComponent";
import { Wrapper } from "../components/layout/Wrapper";
import { GameModeContext } from "../context/GameModeContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootStackScreenProps } from "../types";

export const GameScreen = ({ route }: RootStackScreenProps<"Game">) => {
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(false);
    const {gameMode} = useContext(GameModeContext);
    const {loading, employees, error} = useFetchEmployees();

    useEffect(() => {
        if (gameMode === GameMode.evaluation) {
            setIsNormalPlay(true);
        } else {
            setIsNormalPlay(false);
        }
    }, [gameMode]);

    return (
        <Wrapper>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {!isNormalPlay && employees && <FlashCardComponent employees={employees!} setIsNormalPlay={setIsNormalPlay} />}
        </Wrapper>
    );
};

