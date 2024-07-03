import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves : Square[] = [];
        let currentSquare = board.findPiece(this);

        for(let col=0; col<8; col++){
            if(col!=currentSquare.col){
                let square = Square.at(currentSquare.row, col);
                moves.push(square);
            }
        }

        for(let row=0; row<8; row++){
            if(row!=currentSquare.row){
                let square = Square.at(row, currentSquare.col);
                moves.push(square);
            }
        }
        return moves;
    }
}
