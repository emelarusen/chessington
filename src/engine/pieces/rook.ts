import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves: Square[] = [];
        const currentSquare = board.findPiece(this);

        const directions = [
            { row: 0, col: 1 },  // Right
            { row: 0, col: -1 }, // Left
            { row: 1, col: 0 },  // Down
            { row: -1, col: 0 }  // Up
        ];

        for (const direction of directions) {
            let row = currentSquare.row + direction.row;
            let col = currentSquare.col + direction.col;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const square = Square.at(row, col);
                const blockingPiece = board.getPiece(square);

                if (blockingPiece) {
                    if (blockingPiece.player !== this.player && !(blockingPiece instanceof King)) {
                        moves.push(square);
                    }
                    break;
                }

                moves.push(square);
                row += direction.row;
                col += direction.col;
            }
        }

        return moves;
    }
}
