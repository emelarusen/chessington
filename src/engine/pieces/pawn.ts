import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square'

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = [];
        let currentSquare = board.findPiece(this);

        let direction = (this.player === Player.WHITE) ? 1 : -1;

        let SquareAhead = Square.at(currentSquare.row + direction, currentSquare.col);

        moves.push(SquareAhead);

        if(board.findPiece(this).row <= 1 ||  board.findPiece(this).row >=6) {
            let twoSquaresAhead = Square.at(SquareAhead.row + direction, SquareAhead.col);
            moves.push(twoSquaresAhead);
        }


        return moves;
    }
}
