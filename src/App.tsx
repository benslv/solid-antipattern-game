import {
	createEffect,
	createMemo,
	createSignal,
	Show,
	type Component,
} from "solid-js";
import { checkForPattern, Pebble } from "./util/checkForPattern";

const App: Component = () => {
	const [state, setState] = createSignal<Array<Pebble>>([]);
	const [turn, setTurn] = createSignal<1 | 2>(1);

	const appendSymbol = (d: Pebble) => {
		setState([...state(), d]);
		setTurn((prev) => (prev === 1 ? 2 : 1));
	};

	const patternExists = createMemo(() => checkForPattern(state()));

	createEffect(() => {
		// Computer makes its guess
		if (turn() === 2) {
			let pebble: Pebble = Math.random() > 0.5 ? "○" : "●";

			// If the current guess would result in a loss for the computer, switch to the opposite colour.
			if (checkForPattern([...state(), pebble]).length > 0) {
				pebble = pebble === "○" ? "●" : "○";
			}

			appendSymbol(pebble);
		}
	});

	return (
		<>
			<h1>Current Turn: {turn()}</h1>
			<button onClick={() => appendSymbol("○")}>○</button>
			<button onClick={() => appendSymbol("●")}>●</button>
			<div>
				Pattern:
				{state().join("")}
			</div>
			<div>
				<Show
					when={patternExists().length > 0}
					fallback={"No pattern yet..."}
				>
					Pattern found! {patternExists().at(0)}
				</Show>
			</div>
		</>
	);
};

export default App;
