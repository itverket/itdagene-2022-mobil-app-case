import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { getStatuses, CharStatus } from "../lib/statuses";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

const testData: Employee[] = [
	{
		name: "Robin Aleksander Finstad",
		gender: "male",
		originalUrl:
			"https://itvemployeeimages.blob.core.windows.net/employees/Robin Aleksander Finstad.png?sp=r&st=2022-08-15T07:28:13Z&se=2023-01-01T16:28:13Z&spr=https&sv=2021-06-08&sr=c&sig=WShi5DW8MNleTPN0H5bs9vlhbzyabJgG45h0%2FLeNHvM%3D",
		image:
			"https://itvemployeeimages.blob.core.windows.net/employees/Robin Aleksander Finstad.png?sp=r&st=2022-08-15T07:28:13Z&se=2023-01-01T16:28:13Z&spr=https&sv=2021-06-08&sr=c&sig=WShi5DW8MNleTPN0H5bs9vlhbzyabJgG45h0%2FLeNHvM%3D",
	},
	{
		name: "Praveen Kirubaharan",
		gender: "male",
		originalUrl:
			"https://itvemployeeimages.blob.core.windows.net/employees/Praveen Kirubaharan.png?sp=r&st=2022-08-15T07:28:13Z&se=2023-01-01T16:28:13Z&spr=https&sv=2021-06-08&sr=c&sig=WShi5DW8MNleTPN0H5bs9vlhbzyabJgG45h0%2FLeNHvM%3D",
		image:
			"https://itvemployeeimages.blob.core.windows.net/employees/Praveen Kirubaharan.png?sp=r&st=2022-08-15T07:28:13Z&se=2023-01-01T16:28:13Z&spr=https&sv=2021-06-08&sr=c&sig=WShi5DW8MNleTPN0H5bs9vlhbzyabJgG45h0%2FLeNHvM%3D",
	},
];

interface IWordleStats {
	guesses: string[];
	name: string;
}
interface IWordleKeyboard {
	guesses: string[];
	name: string;
	onCallback: (value: string) => void;
}
interface IWordleKey {
	value: string;
	onClick: (value: string) => void;
	status?: CharStatus;
}
interface IWordleChar {
	value: string;
	status: CharStatus;
}

const WordleChar = ({ value, status }: IWordleChar) => {
	const styles = StyleSheet.create({
		text: {
			flex: 1,
			backgroundColor: "pink",
		},
	});
	return (
		<View>
			<Text style={styles.text}>{value}</Text>
		</View>
	);
};

const WordleDisplay = ({ guesses, name }: IWordleStats) => {
	const charStatuses = getStatuses(name, guesses);
	const n = 6;

	const styles = StyleSheet.create({
		displayRow: {
			flex: 1,
			flexDirection: "row",
			backgroundColor: "red",
		},
		wrapper: {
			minHeight: 200,
			backgroundColor: "green",
		},
	});
	console.log(name);

	return (
		<View style={styles.wrapper}>
			{[1, 1, 1, 1, 1, 1].map((_, i) => {
				<View style={styles.displayRow} key={i}>
					{name.split("").map((_, j) => {
						const char = guesses[i]?.split("")[j];
						return guesses.length > i ? (
							<WordleChar key={j} value={char} status={charStatuses[char]} />
						) : (
							<WordleChar key={j} value="_" status="present" />
						);
					})}
				</View>;
			})}
		</View>
	);
};

const WordleKey = ({ value, onClick, status = "absent" }: IWordleKey) => {
	return (
		<Button style={styles.button} onPress={() => onClick(value)}>
			{value}
		</Button>
	);
};

const WordleKeyboard = ({ guesses, name, onCallback }: IWordleKeyboard) => {
	const [guess, setGuess] = useState("");
	const charStatuses = getStatuses(name, guesses);

	const onClick = (value: string) => {
		if (value === "ENTER") {
			onCallback(guess);
		} else if (value === "DELETE") {
			setGuess((guess) => guess.substring(0, guess.length - 1));
		} else {
			setGuess((guess) => (guess.length < name.length ? guess + value : guess));
		}
	};

	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.code === "Enter") {
				onClick("ENTER");
			} else if (e.code === "Backspace") {
				onClick("DELETE");
			} else {
				const key = e.key.toLocaleUpperCase();
				if (key.length === 1 && key >= "A" && key <= "Z") {
					onClick(key);
				}
			}
		};
		window.addEventListener("keyup", listener);
		return () => {
			window.removeEventListener("keyup", listener);
		};
	}, [onCallback]);

	return (
		<View>
			<View style={styles.keyboardRow}>
				{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
					<WordleKey
						value={key}
						key={key}
						onClick={onClick}
						status={charStatuses[key]}
					/>
				))}
			</View>
			<View style={styles.keyboardRow}>
				{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
					<WordleKey
						value={key}
						key={key}
						onClick={onClick}
						status={charStatuses[key]}
					/>
				))}
			</View>
			<View style={styles.keyboardRow}>
				<WordleKey value="ENTER" onClick={onClick} />
				{["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
					<WordleKey
						value={key}
						key={key}
						onClick={onClick}
						status={charStatuses[key]}
					/>
				))}
				<WordleKey value="DELETE" onClick={onClick} />
			</View>
		</View>
	);
};

export const WordleScreen = ({ navigation }: RootTabScreenProps<"Wordle">) => {
	const [guesses, setGuesses] = useState<string[]>([]);
	// const employeeResult = useFetchEmployees();
	const employee: Employee = testData[0];
	console.log(employee);

	const guessCallback = () => {};

	return (
		<ScrollView>
			{!employee ? (
				<Text>yuhyuh</Text>
			) : (
				<View style={styles.game}>
					<WordleDisplay guesses={guesses} name={employee.name} />
					<WordleKeyboard
						guesses={guesses}
						name={employee.name}
						onCallback={guessCallback}
					/>
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	game: {
		flex: 1,
		justifyContent: "space-between",
	},
	button: {
		flex: 1,
		width: 10,
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		margin: 0,
	},
	keyboardRow: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 0,
		margin: 0,
	},
	text: {
		flex: 1,
		backgroundColor: "#d3d6da",
	},
});
