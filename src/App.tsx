import { createSignal, type Component } from "solid-js";

const digitMap: Record<0 | 1, string> = {
	0: "○",
	1: "●",
};

const App: Component = () => {
	const [state, setState] = createSignal<Array<0 | 1>>([]);

	const appendSymbol = (d: 0 | 1) => {
		setState([...state(), d]);
	};

	return (
		<>
			<h1>Hello world!!!!</h1>
			<button onClick={() => appendSymbol(0)}>○</button>
			<button onClick={() => appendSymbol(1)}>●</button>
			<div>
				Pattern:
				{state()
					.map((digit) => digitMap[digit])
					.join("")}
			</div>
		</>
	);
};

export default App;
