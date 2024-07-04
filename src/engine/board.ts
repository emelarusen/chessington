import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    private lastFromSquare: Square | undefined;
    private lastToSquare: Square | undefined;
    private lastMovedPiece: Piece | undefined;

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();

    }

    public setPiece(square: Square, piece: Piece | undefined) {
        console.log(square.row);
        console.log(square.col);
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);

        if (!!movingPiece && movingPiece.player === this.currentPlayer) {

            // Check for enPassant
            const lastMove = this.getLastMove();
            if (lastMove.from && lastMove.to && lastMove.piece instanceof Pawn) {
                const direction = (this.currentPlayer === Player.WHITE) ? 1 : -1;
                const enPassantRow = (this.currentPlayer === Player.WHITE) ? 4 : 3;

                if (lastMove.to.row === enPassantRow && toSquare.row === enPassantRow && Math.abs(lastMove.from.row - lastMove.to.row) === 2 && lastMove.to.col === toSquare.col) {
                    const capturedPawnSquare = Square.at(lastMove.to.row + direction, lastMove.to.col);
                    this.setPiece(capturedPawnSquare, undefined);
                }

            }


            // Check for pawn promotion
            if (movingPiece instanceof Pawn) {
                const promotionRank = (this.currentPlayer === Player.WHITE) ? 7 : 0;
                if (toSquare.row === promotionRank) {
                    const promotedPiece = new Queen(this.currentPlayer);
                    this.setPiece(toSquare, promotedPiece);
                } else {
                    this.setPiece(toSquare, movingPiece);
                    this.setPiece(fromSquare, undefined);
                }
            } else {
                this.setPiece(toSquare, movingPiece);
                this.setPiece(fromSquare, undefined);
            }

            //this.setPiece(toSquare, movingPiece);


            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.lastFromSquare = fromSquare;
            this.lastToSquare = toSquare;
            this.lastMovedPiece = movingPiece;

        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public getLastMove() {
        return {
            from: this.lastFromSquare,
            to: this.lastToSquare,
            piece: this.lastMovedPiece
        };
    }
}
