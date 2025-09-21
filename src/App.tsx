import {
	createEffect,
	createMemo,
	createSignal,
	on,
	Show,
	type Component,
} from "solid-js";
import { minimax } from "./minimax";
import { Pebble, State } from "./types";
import { checkForPattern } from "./util/checkForPattern";

const App: Component = () => {
	const [state, setState] = createSignal<State>([]);
	const [turn, setTurn] = createSignal<1 | 2>(1);

	const appendSymbol = (d: Pebble) => {
		setState([...state(), d]);
		setTurn((prev) => (prev === 1 ? 2 : 1));
	};

	const patternExists = createMemo(() => checkForPattern(state()));

	createEffect(
		on(turn, (turn) => {
			if (patternExists().hasPattern) return;

			if (turn === 2) {
				appendSymbol(minimax(state(), 10));
			}
		})
	);

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
					when={patternExists().hasPattern ? patternExists() : null}
					fallback={"No pattern yet..."}
					keyed
				>
					{(pattern) => (
						<>
							<p>
								Pattern found!{" "}
								{pattern.hasPattern ? pattern.pattern : null}
							</p>
							<p>Player {turn()} wins!</p>
						</>
					)}
				</Show>
			</div>
		</>
	);
};

export default App;
