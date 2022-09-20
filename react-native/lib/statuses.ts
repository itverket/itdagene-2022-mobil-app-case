export type CharStatus = "absent" | "present" | "correct";

export const getStatuses = (
	solution: string,
	guesses: string[]
): { [key: string]: CharStatus } => {
	const charObj: { [key: string]: CharStatus } = {};
	const splitSolution = solution.split("");

	guesses.forEach((word) => {
		word.split("").forEach((letter, i) => {
			if (!splitSolution.includes(letter)) {
				charObj[letter] = "absent";
			} else if (letter === splitSolution[i]) {
				charObj[letter] = "correct";
			} else {
				charObj[letter] = "present";
			}
		});
	});

	return charObj;
};
