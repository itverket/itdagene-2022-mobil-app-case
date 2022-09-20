import { useState } from "react";
import { Employee } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { GameContext } from "./GameContext";


interface gameModeProviderProps {
    children: React.ReactNode;
}


export default function GameProvider({ children }: gameModeProviderProps) {
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.practice);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [learningArray, setLearningArray] = useState<Employee[]>([]);


    const providerValues = ({
        gameMode: gameMode, 
        setGameMode: setGameMode, 
        employees: employees, 
        setEmployees: setEmployees,
        learningArray: learningArray, 
        setLearningArray: setLearningArray
    });

    return (
        <GameContext.Provider value={providerValues}>
            {children}
        </GameContext.Provider>
    )
}




