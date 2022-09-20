import React, { useState } from "react";
import { Button, ScrollView } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Text } from "../components/Themed";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
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

const WordleKeyboard = ({ guesses, name }: IWordleStats) => {
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

export const WordleScreen = ({ navigation }: RootTabScreenProps<"Wordle">) => {
	const [guesses, setGuesses] = useState<string[]>([]);
	const employeeResult = useFetchEmployees();
	const employee: Employee = testData[0];
	console.log(employee);

	return (
		<ScrollView>
			{!employee ? (
				<Text>yuhyuh</Text>
			) : (
				<>
					<WordleDisplay guesses={guesses} name={employee.name} />
					<WordleKeyboard guesses={guesses} name={employee.name} />
				</>
			)}
		</ScrollView>
	);
};
