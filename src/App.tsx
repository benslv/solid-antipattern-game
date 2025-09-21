import { createMemo, createSignal, Show, type Component } from "solid-js";
import { checkForPattern, Pebble } from "./util/checkForPattern";

const App: Component = () => {
	const [state, setState] = createSignal<Array<Pebble>>([]);

	const appendSymbol = (d: Pebble) => {
		setState([...state(), d]);
	};

	const patternExists = createMemo(() => checkForPattern(state()));

	return (
		<>
			<h1>Hello world!!!!</h1>
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
