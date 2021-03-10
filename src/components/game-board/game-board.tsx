import { Component, h, Prop, State } from '@stencil/core';
import { Column, defaultGameRules, GameRules, Row } from './GameRules';

@Component({
	tag: 'game-board',
	styleUrl: 'game-board.css',
	shadow: true,
})
export class GameBoard {
	@Prop() player1: string = '';
	@Prop() player2: string = '';
	@State() gameRules: GameRules = defaultGameRules;

	render() {
		const board = (['top', 'middle', 'bottom'] as Row[]).map(row => {
			const columns = (['left', 'center', 'right'] as Column[]).map(column => {
				return <button disabled={ this.gameRules.field(row, column) !== '' } class="field" onClick={_ => this.gameRules = this.gameRules.set(row, column)}>
					{this.gameRules.field(row, column)}
				</button>
			});
			return <div class="row">{columns}</div>
		})
		return [
			<h1 class="next-player">Your turn, player X</h1>,
			<div class="board">
				{ board }
			</div>,
		];
	}
}
