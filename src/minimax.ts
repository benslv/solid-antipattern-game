import { Pebble, State } from "./types";
import { checkForPattern } from "./util/checkForPattern";

function getPossibleMoves(
	state: State
): Array<{ pebble: Pebble; state: State }> {
	return [
		{
			pebble: "○",
			state: [...state, "○"],
		},
		{
			pebble: "●",
			state: [...state, "●"],
		},
	];
}

function minimaxRecursive(
	state: State,
	depth: number,
	isMaximising: boolean
): number {
	const { hasPattern } = checkForPattern(state);

	if (hasPattern) {
		return isMaximising ? 1 : -1;
	}

	if (depth === 0) {
		return 0;
	}

	const possibleMoves = getPossibleMoves(state);

	if (isMaximising) {
		let maxEval = -Infinity;

		for (const move of possibleMoves) {
			const score = minimaxRecursive(move.state, depth - 1, false);
			maxEval = Math.max(maxEval, score);
		}

		return maxEval;
	} else {
		let minEval = Infinity;

		for (const move of possibleMoves) {
			const score = minimaxRecursive(move.state, depth - 1, true);
			minEval = Math.min(minEval, score);
		}

		return minEval;
	}
}

export function minimax(state: State, depth = 1): Pebble {
	let bestScore = -Infinity;
	let bestMove: Pebble | null = null;

	const possibleMoves = getPossibleMoves(state);

	for (const move of possibleMoves) {
		const score = minimaxRecursive(move.state, depth - 1, false);

		if (score > bestScore) {
			bestScore = score;
			bestMove = move.pebble;
		}
	}

	return bestMove ?? Math.random() < 0.5
		? possibleMoves[0].pebble
		: possibleMoves[1].pebble;
}
