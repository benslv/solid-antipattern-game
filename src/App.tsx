import {
	createEffect,
	createMemo,
	createSignal,
	Match,
	on,
	Show,
	Switch,
	type Component,
} from "solid-js";
import { minimax } from "./minimax";
import { Pebble, State } from "./types";
import { checkForPattern } from "./util/checkForPattern";

import "./styles.css";

const App: Component = () => {
	const [state, setState] = createSignal<State>([]);
	const [turn, setTurn] = createSignal<1 | 2>(1);

	const appendSymbol = (d: Pebble) => {
		setState([...state(), d]);
		setTurn((prev) => (prev === 1 ? 2 : 1));
	};

	const resetGame = () => {
		setState([]);
		setTurn(1);
	};

	const patternCheck = createMemo(() => checkForPattern(state()));

	createEffect(
		on(turn, (turn) => {
			if (patternCheck().hasPattern) return;

			if (turn === 2) {
				appendSymbol(minimax(state(), 5));
			}
		})
	);

	return (
		<>
			<h1>The anti-pattern game</h1>
			<p>
				Welcome to the{" "}
				<a
					href="https://hakon.gylterud.net/antipattern/"
					target="_blank"
				>
					anti-pattern game
				</a>
				!
			</p>
			<ol>
				<li>
					Click a button to add a white or black <b>pebble</b> to the
					sequence below.
				</li>
				<li>
					You lose if the pebble you put down creates a <b>pattern</b>{" "}
					in the sequence.
				</li>
				<li>
					A <b>pattern</b> is a sequence of pebbles{" "}
					<b>repeated three times in a row.</b>
				</li>
				<li>You win if your opponent loses.</li>
			</ol>
			<p>
				Can you beat our cutting-edge, <i>AI-powered</i> opponent??? 🚀
			</p>
			<Show
				when={!patternCheck().hasPattern}
				fallback={
					<button onClick={() => resetGame()}>Play again</button>
				}
			>
				<span>Add pebble: </span>
				<button onClick={() => appendSymbol("○")}>○</button>
				<button onClick={() => appendSymbol("●")}>●</button>
			</Show>
			<p>
				Pattern: <span class="pattern">{state().join("")}</span>
			</p>
			<Show
				when={patternCheck().hasPattern ? patternCheck() : null}
				keyed
			>
				{(pattern) => (
					<>
						<p>
							Pattern found!{" "}
							<span class="pattern">
								{pattern.hasPattern ? pattern.pattern : null}
							</span>
						</p>
						<p>Player {turn()} wins!</p>
						<Switch>
							<Match when={turn() === 1}>You won! 🎉</Match>
							<Match when={turn() === 2}>
								The robot overlords have defeated you... 🤖
							</Match>
						</Switch>
					</>
				)}
			</Show>
		</>
	);
};

export default App;
