import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import Queen from "../../src/engine/pieces/queen";


describe('Pawn Promotion', () => {
    let board: Board;

    beforeEach(() => {
        board = new Board();
    });

    it('should promote white pawn to queen', () => {
        // Arrange
        const pawn = new Pawn(Player.WHITE);
        board.setPiece(Square.at(6, 0), pawn);

        // Act
        board.movePiece(Square.at(6, 0), Square.at(7, 0));

        // Assert
        const promotedPiece = board.getPiece(Square.at(7, 0));
        if(promotedPiece!=undefined){
        promotedPiece.should.be.an.instanceof(Queen);
        promotedPiece!.player.should.equal(Player.WHITE); }
    });

    it('should promote black pawn to queen', () => {
        // Arrange
        const pawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 0), pawn);

        // Act
        board.movePiece(Square.at(1, 0), Square.at(0, 0));

        // Assert
        const promotedPiece = board.getPiece(Square.at(0, 0));
        if(promotedPiece!=undefined){
        promotedPiece.should.be.an.instanceof(Queen);
        promotedPiece!.player.should.equal(Player.BLACK);}
    });

});
