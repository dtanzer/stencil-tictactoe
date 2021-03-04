import { Component, h, State } from '@stencil/core';
import { NewGameData } from '../new-game/new-game';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css',
	shadow: true,
})
export class AppRoot {
	@State() private running: boolean = false;
	@State() private data: NewGameData | undefined;

	startGame(data: NewGameData) {
		this.running = true;
		this.data = data;
	}

	render() {
		const newGame = this.running? undefined : <new-game foo="bar" onStartNewGame={e => this.startGame(e.detail)}></new-game>;
		const board = this.running? <game-board player1={this.data?.player1}  player2={this.data?.player2}></game-board> : undefined;

		return (
			<div>
				<header>
					<h1>TicTacToe</h1>
				</header>

				<main>
					{ newGame }
					{ board }
				</main>
			</div>
		);
	}
}
