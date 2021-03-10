import { newSpecPage } from '@stencil/core/testing';
import { GameBoard } from '../game-board';

describe('game-board', () => {
	it('shows empty grid at start', async () => {
		const { root } = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		const fields = root?.shadowRoot?.querySelectorAll('.field');

		expect(fields).toHaveLength(9);
	});

	it('shows headline "Your turn, player X" at start', async () => {
		const { root } = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		const fields = root?.shadowRoot?.querySelectorAll('h1');

		expect(fields).toHaveLength(1);
		if(fields) {
			expect(fields[0].textContent).toEqual("Your turn, player X");
		}
	});

	it('shows "X" in clicked field at first click', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		const fields = root?.shadowRoot?.querySelectorAll('.field');
		if(fields) {
			const clickEvent = new CustomEvent("click");
			fields[3].dispatchEvent(clickEvent);
			await waitForChanges();

			expect(fields[3].textContent).toEqual('X');
		}
	});

	it('disables buttons once they were clicked', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		const fields = root?.shadowRoot?.querySelectorAll('.field');
		if(fields) {
			const clickEvent = new CustomEvent("click");
			fields[3].dispatchEvent(clickEvent);
			await waitForChanges();

			//'disabled' is an empty string when we pass true and null otherwise!?!
			expect(fields[3].getAttribute('disabled')).toEqual('');
		}
	});

	it('does not disable buttons that were not yet clicked', async () => {
		const { root } = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		const fields = root?.shadowRoot?.querySelectorAll('.field');
		if(fields) {
			//'disabled' is an empty string when we pass true and null otherwise!?!
			expect(fields[3].getAttribute('disabled')).toEqual(null);
		}
	});
});
