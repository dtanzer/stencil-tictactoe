export type Player = 'X' | 'O';
export type FieldContent = Player | '';
export type Row = 'top' | 'middle' | 'bottom';
export type Column = 'left' | 'center' | 'right';

export type RowContent = {
	[k in Column]: FieldContent
}
export type Board = {
	[k in Row]: RowContent
}

export type GameRules = {
	field(row: Row, column: Column): FieldContent,
	set(row: Row, column: Column): GameRules,
}

export class GameRulesClass implements GameRules {
	private readonly player: Player;
	private readonly board: Board;

	constructor(player: Player, board?: Board) {
		if(board) {
			this.board = board;
		} else {
			this.board = {
				top: { left: '', center: '', right: ''},
				middle: { left: '', center: '', right: ''},
				bottom: { left: '', center: '', right: ''},
			}
		}

		this.player = player;
	}
	
	field(row: Row, column: Column): FieldContent {
		return this.board[row][column];
	}
	set(row: Row, column: Column): GameRulesClass {
		const withSetField: Partial<Board> = { [row]: { [column]: this.player }};

		const nextPlayer = this.player === 'X'? 'O' : 'X';
		const nextBoard = { 
			top: { ...this.board.top, ...withSetField.top, },
			middle: { ...this.board.middle, ...withSetField.middle, },
			bottom: { ...this.board.bottom, ...withSetField.bottom, },
		};

		return new GameRulesClass(nextPlayer, nextBoard);
	}
}

export const defaultGameRules: GameRules = new GameRulesClass('X');
