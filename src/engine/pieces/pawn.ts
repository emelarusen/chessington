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

        return moves;
    }
}
