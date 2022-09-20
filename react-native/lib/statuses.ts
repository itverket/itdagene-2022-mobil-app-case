export type CharStatus = "absent" | "present" | "correct" | "none";

export const getStatuses = (
	solution: string,
	guesses: string[]
): { [key: string]: CharStatus }[] => {
	const charObjects: { [key: string]: CharStatus }[] = [];
	const splitSolution = solution.toLocaleUpperCase().split("");

	guesses.forEach((word) => {
		const charObj: { [key: string]: CharStatus } = {};
		word.split("").forEach((letter, i) => {
			if (!splitSolution.includes(letter)) {
				charObj[letter] = "absent";
			} else if (letter === splitSolution[i]) {
				charObj[letter] = "correct";
			} else {
				charObj[letter] = "present";
			}
		});
		const ncharObj = JSON.parse(JSON.stringify(charObj)); // Make copy
		charObjects.push(ncharObj);
	});

	if (charObjects.length === 0) return [{}];
	return charObjects;
};

export const getStatusesDisplay = (
	solution: string,
	guesses: string[]
): CharStatus[][] => {
	const charObjects: CharStatus[][] = [];
	const splitSolution = solution.toLocaleUpperCase().split("");

	guesses.forEach((word) => {
		const charObj: CharStatus[] = [];
		word.split("").forEach((letter, i) => {
			if (!splitSolution.includes(letter)) {
				charObj.push("absent");
			} else if (letter === splitSolution[i]) {
				charObj.push("correct");
			} else {
				charObj.push("present");
			}
		});
		const ncharObj = JSON.parse(JSON.stringify(charObj)); // Make copy
		charObjects.push(ncharObj);
	});

	if (charObjects.length === 0) return [[]];
	return charObjects;
};
