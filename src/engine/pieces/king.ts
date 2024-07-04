import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves : Square[] = [];
        const currentSquare = board.findPiece(this);

        const directions = [
            { row: 1, col: -1}, //up-left
            { row: 1, col: 0 }, //up
            { row: 1, col: 1 }, //up-right
            { row: 0, col: 1 }, //right
            { row: -1, col: 1 }, //down-right
            { row: -1, col: 0 }, //down
            { row: -1, col: -1 }, //down-left
            { row: 0, col: -1 } //left
        ];

        for (const direction of directions) {
            let row : number = currentSquare.row + direction.row;
            let col : number = currentSquare.col + direction.col;
            if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const square = Square.at(row, col);
                const blockingPiece = board.getPiece(square);
                if (!blockingPiece)
                    moves.push(square);
                if (blockingPiece && blockingPiece.player !== this.player && !(blockingPiece instanceof King))
                    moves.push(square);
            }

        }

        return moves;
    }
}
