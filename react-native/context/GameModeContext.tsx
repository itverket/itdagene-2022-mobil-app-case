import { createContext } from "react";
import { Employee } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";

export interface GameModeContextType {
	gameMode: GameMode;
	setGameMode: (value: GameMode) => void;
	employee: Employee;
	setEmployee: (employee: Employee) => void;
}

export const GameModeContext = createContext<GameModeContextType>({
	gameMode: GameMode.practice,
	setGameMode: () => {},
	employee: { name: "Test Name", image: "", originalUrl: "", gender: "male" },
	setEmployee: (employee: Employee) => {},
});
