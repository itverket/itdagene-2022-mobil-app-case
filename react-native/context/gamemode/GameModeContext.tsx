import { createContext } from "react";
import { GameMode } from "../../models/gameStateEnum";

export interface GameModeContextType {
    gameMode: GameMode;
    setGameMode: (value: GameMode) => void;
}


export const GameModeContext = createContext<GameModeContextType>({
    gameMode: GameMode.practice,
    setGameMode: () => { },
})