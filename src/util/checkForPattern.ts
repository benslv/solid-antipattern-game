export type Pebble = "○" | "●";

const PATTERN_REGEX = /([○●]+)\1\1/;
export function checkForPattern(state: Array<Pebble>) {
	const stateString = state.join("");

	return stateString.match(PATTERN_REGEX) ?? [];
}
