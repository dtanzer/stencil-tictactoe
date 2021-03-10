import { GameRulesClass, } from '../GameRules'

describe('GameRules', () => {
	it('sets an X when we first set a value', () => {
		const rules = new GameRulesClass('X');

		const nextRules = rules.set('top', 'left');

		expect(nextRules.field('top', 'left')).toEqual('X');
	})

	it('sets an O when we set the second value', () => {
		let rules = new GameRulesClass('X');

		rules = rules.set('top', 'left');
		const nextRules = rules.set('top', 'center');

		expect(nextRules.field('top', 'left')).toEqual('X');
		expect(nextRules.field('top', 'center')).toEqual('O');
	})
});
