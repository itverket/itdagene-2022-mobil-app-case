import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameModeProvider from './context/gamemode/GameModeProvider';

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from 'react';
import CurrentScoreProvider from './context/currentscore/CurrentScoreProvider';

const theme = {
	...DefaultTheme,
	// Specify custom property
	myOwnProperty: true,
	// Specify custom property in nested object
	colors: {
		...DefaultTheme.colors,
		primary: "#BADA55",
	},
};

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<PaperProvider theme={theme}>
				<GameModeProvider>
					<CurrentScoreProvider>

					<SafeAreaProvider>
						<Navigation />
						<StatusBar />
					</SafeAreaProvider>
					</CurrentScoreProvider>
          		</GameModeProvider>
			</PaperProvider>
		);
	}
}
