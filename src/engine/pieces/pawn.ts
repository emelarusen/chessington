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

        if( (SquareAhead.row<7 && this.player === Player.WHITE)
            ||  (SquareAhead.row>0 && this.player === Player.BLACK)) {
            if (board.getPiece(SquareAhead) === undefined) {
                moves.push(SquareAhead);
            }
        }

        if( (board.findPiece(this).row === 1 && this.player === Player.WHITE)
            ||  (board.findPiece(this).row === 6 && this.player === Player.BLACK)){

            let twoSquaresAhead = Square.at(SquareAhead.row + direction, SquareAhead.col);

            if (board.getPiece(twoSquaresAhead) === undefined && board.getPiece(SquareAhead) === undefined) {
                moves.push(twoSquaresAhead);
            }

        }

        return moves;
    }
}
