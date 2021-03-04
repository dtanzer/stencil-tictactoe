import { Component, Host, h, Prop } from '@stencil/core';

@Component({
	tag: 'game-board',
	styleUrl: 'game-board.css',
	shadow: true,
})
export class GameBoard {
	@Prop() player1: string = '';
	@Prop() player2: string = '';

	render() {
		return (
			<div>Hello Board!</div>
		);
	}

}
