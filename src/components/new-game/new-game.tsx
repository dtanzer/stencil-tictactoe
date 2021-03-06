import { Component, Host, h, State, EventEmitter, Event, Prop } from '@stencil/core';

export interface NewGameData {
	player1: string,
	player2: string,
}

@Component({
	tag: 'new-game',
	styleUrl: 'new-game.css',
	shadow: true,
})
export class NewGame {
	@State() private validationMessages: string[] = [];
	@State() private player1Name: string = '';
	@State() private player2Name: string = '';

	@Prop() foo: string | undefined;
	@Event() startNewGame: EventEmitter<NewGameData> | undefined;

	render() {
		const validation = this.renderValidationMessages();

		return (
			<Host>
				{ validation }
				<label>Player 1: <input type="text" value={this.player1Name} name="player1"
					onChange={e => this.player1Name = (e.target as HTMLInputElement).value }/></label>
				<label>Player 2: <input type="text" value={this.player2Name} name="player2"
					onChange={e => this.player2Name = (e.target as HTMLInputElement).value }/></label>
				<button onClick={_ => this.newGame()}>New Game</button>
			</Host>
		);
	}

	private newGame() {
		const newMessages = [ ];
		if(!this.player1Name) {
			newMessages.push('Please enter name of Player 1');
		}
		if(!this.player2Name) {
			newMessages.push('Please enter name of Player 2');
		}
		this.validationMessages = newMessages;

		if(this.validationMessages.length === 0) {
			this.startNewGame?.emit({ player1: this.player1Name, player2: this.player2Name, });
		}
	}

	private renderValidationMessages() {
		if(this.validationMessages.length > 0) {
			return <ul>
				{this.validationMessages.map(m => <li>{m}</li>)}
			</ul>
		}
	}
}
