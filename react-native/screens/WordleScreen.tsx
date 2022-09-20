import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { getStatuses, CharStatus } from "../lib/statuses";
import { RootTabScreenProps } from "../types";

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

const WordleDisplay = ({ guesses, name }: IWordleStats) => {
	return (
		<Card>
			<Card.Title title="Card Title" subtitle="Card Subtitle" />
			<Card.Content>
				<Title>Card title</Title>
				<Paragraph>Card content</Paragraph>
			</Card.Content>
			<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
			<Card.Actions>
				<Button title="cancel">Cancel</Button>
				<Button title="ok">Ok</Button>
			</Card.Actions>
		</Card>
	);
};

const WordleKey = ({ value, onClick, status = "absent" }: IWordleKey) => {
	const styles = StyleSheet.create({
		button: {
			flex: 1,
			justifyContent: "space-between",
			padding: 20,
			margin: 10,
		},
	});
	return (
		<View style={styles.button}>
			<Button title={value} onPress={() => onClick(value)}>
				{value}
			</Button>
		</View>
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
			<View>
				{["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
					<WordleKey
						value={key}
						key={key}
						onClick={onClick}
						status={charStatuses[key]}
					/>
				))}
			</View>
			<View>
				{["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
					<WordleKey
						value={key}
						key={key}
						onClick={onClick}
						status={charStatuses[key]}
					/>
				))}
			</View>
			<View>
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
				<>
					<WordleDisplay guesses={guesses} name={employee.name} />
					<WordleKeyboard
						guesses={guesses}
						name={employee.name}
						onCallback={guessCallback}
					/>
				</>
			)}
		</ScrollView>
	);
};
