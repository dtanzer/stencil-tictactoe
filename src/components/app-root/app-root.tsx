import { Component, h } from '@stencil/core';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css',
	shadow: true,
})
export class AppRoot {
	render() {
		return (
			<div>
				<header>
					<h1>TicTacToe</h1>
				</header>

				<main>
					<new-game></new-game>
				</main>
			</div>
		);
	}
}
