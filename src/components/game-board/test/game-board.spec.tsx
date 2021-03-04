import { newSpecPage } from '@stencil/core/testing';
import { GameBoard } from '../game-board';

describe('game-board', () => {
	it.skip('renders', async () => {
		const page = await newSpecPage({
			components: [GameBoard],
			html: `<game-board></game-board>`,
		});

		expect('FIXME test-drive this component').toEqual(false);
	});
});
