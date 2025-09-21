import { Pebble } from "../types";

type PatternResult =
	| {
			hasPattern: false;
	  }
	| {
			hasPattern: true;
			pattern: string;
	  };

const PATTERN_REGEX = /([○●]+)\1\1/;
export function checkForPattern(state: Array<Pebble>): PatternResult {
	const stateString = state.join("");

	const result = stateString.match(PATTERN_REGEX);

	if (!result) return { hasPattern: false };

	if (result.length > 0) {
		return { hasPattern: true, pattern: result.at(0)! };
	}

	return { hasPattern: false };
}
