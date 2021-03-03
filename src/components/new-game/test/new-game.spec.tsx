import { newSpecPage } from '@stencil/core/testing';
import { NewGame } from '../new-game';

function exists<T>(value: T | null | undefined): value is T {
	expect(value).toBeTruthy();
	return value != null;
}

describe('new-game', () => {
	it('contains two input fields for players', async () => {
		const { root } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});
		const labels = root?.shadowRoot?.querySelectorAll('label');
		expect(labels).toHaveLength(2);
		if(labels) {
			expect(labels[0].textContent).toEqual('Player 1: ');
			expect(labels[0].querySelectorAll('input[type=text]')).toHaveLength(1);
			expect(labels[1].textContent).toEqual('Player 2: ');
			expect(labels[1].querySelectorAll('input[type=text]')).toHaveLength(1);
		}
	});

	it('contains a button to start a new game', async () => {
		const { root } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});
		const buttons = root?.shadowRoot?.querySelectorAll('button');
		if(exists(buttons)) {
			expect(buttons).toHaveLength(1);
			expect(buttons[0].textContent).toEqual('New Game');	
		}
	});

	it('shows error messages after button click when player names are empty', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});

		const button = root?.shadowRoot?.querySelector('button');
		const clickEvent = new CustomEvent("click");
		button?.dispatchEvent(clickEvent);

		await waitForChanges();

		const validationMessages = root?.shadowRoot?.querySelector('ul');
		expect(validationMessages).toBeTruthy();
		expect(validationMessages?.children).toHaveLength(2);
		expect(validationMessages?.children[0].textContent).toEqual("Please enter name of Player 1");
		expect(validationMessages?.children[1].textContent).toEqual("Please enter name of Player 2");
	});

	it('does not contain validation messages before button click', async () => {
		const { root } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});

		const validationMessages = root?.shadowRoot?.querySelector('ul');
		expect(validationMessages).toBeFalsy();
	});

	it('shows one error message after button click when player 1 name is empty', async () => {
		const { root, waitForChanges } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});

		const player2Name: HTMLInputElement | null | undefined = root?.shadowRoot?.querySelector('input[name=player2]');
		if(exists(player2Name)) {
			player2Name.value = 'The Player 2';
		}
		const changeEvent = new Event("change");
		player2Name?.dispatchEvent(changeEvent);
		await waitForChanges();

		const button = root?.shadowRoot?.querySelector('button');
		const clickEvent = new CustomEvent("click");
		button?.dispatchEvent(clickEvent);
		await waitForChanges();

		const validationMessages = root?.shadowRoot?.querySelector('ul');
		expect(validationMessages).toBeTruthy();
		expect(validationMessages?.children).toHaveLength(1);
		expect(validationMessages?.children[0].textContent).toEqual("Please enter name of Player 1");
	});

	it('sends start even when button is clicked', async () => {
		const onNewGame = jest.fn();
		const { root, waitForChanges } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});
		root?.addEventListener('startNewGame', onNewGame);

		const player1Name: HTMLInputElement | null | undefined = root?.shadowRoot?.querySelector('input[name=player1]');
		if(exists(player1Name)) {
			player1Name.value = 'The Player 1';
		}
		const changeEvent1 = new Event("change");
		player1Name?.dispatchEvent(changeEvent1);

		const player2Name: HTMLInputElement | null | undefined = root?.shadowRoot?.querySelector('input[name=player2]');
		if(exists(player2Name)) {
			player2Name.value = 'The Player 2';
		}
		const changeEvent2 = new Event("change");
		player2Name?.dispatchEvent(changeEvent2);
		await waitForChanges();

		const button = root?.shadowRoot?.querySelector('button');
		const clickEvent = new CustomEvent("click");
		button?.dispatchEvent(clickEvent);
		await waitForChanges();

		expect(onNewGame.mock.calls).toHaveLength(1);
		expect(onNewGame.mock.calls[0][0].detail).toEqual({ player1: 'The Player 1', player2: 'The Player 2', });
	});

	it('does not send start even when button is clicked and there are validation errors', async () => {
		const onNewGame = jest.fn();
		const { root, waitForChanges } = await newSpecPage({
			components: [NewGame],
			html: `<new-game></new-game>`,
		});
		root?.addEventListener('startNewGame', onNewGame);

		const button = root?.shadowRoot?.querySelector('button');
		const clickEvent = new CustomEvent("click");
		button?.dispatchEvent(clickEvent);
		await waitForChanges();

		expect(onNewGame.mock.calls).toHaveLength(0);
	});
});
