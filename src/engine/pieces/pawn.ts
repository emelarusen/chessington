import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves: Square[] = [];
        let currentSquare = board.findPiece(this);
        let direction = (this.player === Player.WHITE) ? 1 : -1;

        let squareAhead = Square.at(currentSquare.row + direction, currentSquare.col);
        if (squareAhead.row >= 0 && squareAhead.row < 8 && !board.getPiece(squareAhead)) {
            moves.push(squareAhead);

            if ((this.player === Player.WHITE && currentSquare.row === 1) ||
                (this.player === Player.BLACK && currentSquare.row === 6)) {
                let twoSquaresAhead = Square.at(currentSquare.row + 2 * direction, currentSquare.col);
                if (!board.getPiece(twoSquaresAhead)) {
                    moves.push(twoSquaresAhead);
                }
            }
        }

        // Capture
        const captureMoves = [
            Square.at(currentSquare.row + direction, currentSquare.col - 1),
            Square.at(currentSquare.row + direction, currentSquare.col + 1)
        ];

        for (const captureMove of captureMoves) {
            if (captureMove.row >= 0 && captureMove.row < 8 && captureMove.col >= 0 && captureMove.col < 8) {
                const blockingPiece = board.getPiece(captureMove);
                if (blockingPiece && blockingPiece.player !== this.player && !(blockingPiece instanceof King)) {
                    moves.push(captureMove);
                }
            }
        }

        return moves;
    }
}
