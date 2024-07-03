import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves : Square[] = [];
        let currentSquare = board.findPiece(this);

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
            const square = Square.at(row, col);
            if(square.row<=7 && square.row>=0 && square.col<=7 && square.col>=0) moves.push(square);

        }

        return moves;
    }
}
