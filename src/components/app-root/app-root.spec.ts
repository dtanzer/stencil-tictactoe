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
});
