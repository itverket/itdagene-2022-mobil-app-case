import { useContext, useState } from "react";
import { View } from "react-native";
import BehindBoxComponent from "../components/games/BehindBoxComponent";
import { GameContext } from "../context/GameContext";
import { GameMode } from "../models/gameStateEnum";

const BehindBoxScreen = () => {
    const {employees, learningArray, gameMode} = useContext(GameContext);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const isEvaluation = gameMode === GameMode.evaluation;

    const gameArray = isEvaluation ? employees : learningArray;

    const handleNext = () => setCurrentIndex((prev) => prev + 1);
    
    return (
        <View>
            <BehindBoxComponent 
                employee={gameArray[currentIndex]} 
                handleNext={handleNext}
            />
        </View>
    )
};

export default BehindBoxScreen;