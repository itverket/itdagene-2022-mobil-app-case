import { useState } from "react";
import { GameMode } from "../../models/gameStateEnum";
import { GameModeContext } from "./GameModeContext";


interface gameModeProviderProps {
    children: React.ReactNode;
}


export default function GameModeProvider({ children }: gameModeProviderProps) {
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.practice);


    const providerValues = ({gameMode: gameMode, setGameMode: setGameMode});

    return (
        <GameModeContext.Provider value={providerValues}>
            {children}
        </GameModeContext.Provider>
    )
}




