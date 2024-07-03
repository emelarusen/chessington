import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = [];
        let currentSquare = board.findPiece(this);

        const directions = [
            { row: 1, col: 1 },   // Top-right
            { row: 1, col: -1 },  // Top-left
            { row: -1, col: 1 },  // Bottom-right
            { row: -1, col: -1 }  // Bottom-left
        ];

        for (const direction of directions) {
            let row : number = currentSquare.row + direction.row;
            let col : number = currentSquare.col + direction.col;
            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const square = Square.at(row, col);
                moves.push(square);
                row += direction.row;
                col += direction.col;
            }
        }

        return moves;
    }
}
