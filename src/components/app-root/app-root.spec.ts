import { newSpecPage } from "@stencil/core/testing";
import { NewGame } from "../new-game/new-game";
import { AppRoot } from "./app-root";

describe('app-root', () => {
	it('shows new-game at start', async ()=>{
		const { root } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const newGame = root?.shadowRoot?.querySelectorAll('new-game');
		expect(newGame).toHaveLength(1);
	});

	it('does not show new-game after a game was started', async ()=>{
		const { root, waitForChanges } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const newGame = root?.shadowRoot?.querySelector('new-game');
		newGame?.dispatchEvent(new CustomEvent('startNewGame', { detail: { player1: 'P1', player2: 'P2' }}));
		await waitForChanges();

		const newGameAfterStart = root?.shadowRoot?.querySelectorAll('new-game');
		expect(newGameAfterStart).toHaveLength(0);
	});

	it('shows the board when a game is running', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const newGame = root?.shadowRoot?.querySelector('new-game');
		newGame?.dispatchEvent(new CustomEvent('startNewGame', { detail: { player1: 'P1', player2: 'P2' }}));
		await waitForChanges();

		const board = root?.shadowRoot?.querySelectorAll('game-board');
		expect(board).toHaveLength(1);
	});

	it('does not show the board when no game is running', async () => {
		const { root, } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const board = root?.shadowRoot?.querySelectorAll('game-board');
		expect(board).toHaveLength(0);
	});

	it('passes player 1 data to the board', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const newGame = root?.shadowRoot?.querySelector('new-game');
		newGame?.dispatchEvent(new CustomEvent('startNewGame', { detail: { player1: 'P1', player2: 'P2' }}));
		await waitForChanges();

		const board = root?.shadowRoot?.querySelectorAll('game-board[player1="P1"]');
		expect(board).toHaveLength(1);
	});

	it('passes player 2 data to the board', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [AppRoot],
			html: `<app-root></app-root>`,
		});

		const newGame = root?.shadowRoot?.querySelector('new-game');
		newGame?.dispatchEvent(new CustomEvent('startNewGame', { detail: { player1: 'P1', player2: 'P2' }}));
		await waitForChanges();

		const board = root?.shadowRoot?.querySelectorAll('game-board[player2="P2"]');
		expect(board).toHaveLength(1);
	});

});
