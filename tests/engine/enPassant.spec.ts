import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';

describe('enPassant', () => {
    let board: Board;
    beforeEach(() => {
        board = new Board();
    })

    it('can perform an enPassant capture', () =>{
        // Arrange
        const pawn1 = new Pawn(Player.WHITE);
        const pawn2 = new Pawn(Player.BLACK);

        // Act
        board.setPiece(Square.at(1, 5), pawn1);
        board.setPiece(Square.at(3, 4), pawn2);
        //console.log(board.getPiece(Square.at(6, 4)));
        const captureSquare = Square.at(2, 5);
        board.movePiece(Square.at(1, 5), Square.at(3, 5));
        //console.log(board.getPiece(Square.at(4, 4)));
        board.movePiece(Square.at(3, 4), captureSquare);

        // Assert
        board.findPiece(pawn2)?.row.should.equal(captureSquare.row);
        board.findPiece(pawn2)?.col.should.equal(captureSquare.col);
        //console.log(board.getPiece(Square.at(4, 4)));
        (board.getPiece(Square.at(3, 5)) === undefined).should.be.true;


    });

});