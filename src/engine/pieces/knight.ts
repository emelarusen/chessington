import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const moves : Square[] = [];
        const currentSquare = board.findPiece(this);

        const directions = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 }
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
