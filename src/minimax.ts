import { Pebble, State } from "./types";
import { checkForPattern } from "./util/checkForPattern";

function minimaxRecursive(
	state: State,
	depth: number,
	isMaximising: boolean
): number {
	console.log({ depth });

	const { hasPattern } = checkForPattern(state);

	if (hasPattern) {
		return isMaximising ? 1 : -1;
	}

	if (depth === 0) {
		return 0;
	}

	const possibleMoves: Array<{ pebble: Pebble; state: State }> = [
		{
			pebble: "○",
			state: [...state, "○"],
		},
		{
			pebble: "●",
			state: [...state, "●"],
		},
	];

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

	const possibleMoves: Array<{ pebble: Pebble; state: State }> = [
		{
			pebble: "○",
			state: [...state, "○"],
		},
		{
			pebble: "●",
			state: [...state, "●"],
		},
	];

	for (const move of possibleMoves) {
		const score = minimaxRecursive(move.state, depth - 1, false);

		if (score > bestScore) {
			bestScore = score;
			bestMove = move.pebble;
		}
	}

	if (bestMove === null) {
		return Math.random() < 0.5
			? possibleMoves[0].pebble
			: possibleMoves[1].pebble;
	}

	return bestMove;
}
