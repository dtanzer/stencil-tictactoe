import { newSpecPage } from '@stencil/core/testing';
import { NewGame } from '../new-game';

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
		expect(buttons).toHaveLength(1);
		if(buttons) {
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
		expect(player2Name).toBeTruthy();
		if(player2Name) {
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
});
