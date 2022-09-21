import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { FlashCardComponent } from "../components/games/FlashCardComponent";
import { Wrapper } from "../components/layout/Wrapper";
import { GameContext } from "../context/GameContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootStackScreenProps } from "../types";
import { GibbershScreen } from "./Gibbersh";
import WordleScreen from "./WordleScreen";

export const GameScreen = ({ route: { params: { gameType }} }: RootStackScreenProps<"Game">) => {
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(false);
    const {gameMode, setEmployees, learningArray} = useContext(GameContext);
    const {loading, employees, error} = useFetchEmployees();

    const isLearning = gameMode === GameMode.practice;
    let gameArray = isLearning ? learningArray : employees;
    const shuffled = employees?.sort(() => 0.5 - Math.random());

    let employeesToList = shuffled?.slice(0,11)

    useEffect(() => {

        if(gameArray) { 
            const shuffled = gameArray.sort(() => 0.5 - Math.random());
            console.log(shuffled)

            gameArray = shuffled.slice(0, 11);
        }

    }, [gameArray])

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
            case "G":
                return employeesToList && (<GibbershScreen employees={employeesToList} />)
            default: 
                return <Text>Default</Text>
        }
    }

    return (
        <Wrapper>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {!isNormalPlay && <FlashCardComponent setIsNormalPlay={setIsNormalPlay} />}
            {isNormalPlay && employees && getContent()}
        </Wrapper>
    );
};

