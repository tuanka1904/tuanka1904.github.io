"use client";
import { useEffect, useRef, useState } from "react";

const ROWS = 20;
const COLS = 10;
const EMPTY = 0;

const TETROMINOS = [
    { shape: [[1, 1, 1, 1]], color: 1 }, // I
    { shape: [[1, 1], [1, 1]], color: 2 }, // O
    { shape: [[0, 1, 0], [1, 1, 1]], color: 3 }, // T
    { shape: [[1, 0, 0], [1, 1, 1]], color: 4 }, // L
    { shape: [[0, 0, 1], [1, 1, 1]], color: 5 }, // J
    { shape: [[0, 1, 1], [1, 1, 0]], color: 6 }, // S
    { shape: [[1, 1, 0], [0, 1, 1]], color: 7 }, // Z
];

export default function AutoTetris() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const BLOCK_SIZE = canvas.width / COLS;

        let board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
        let piece = null;
        let dropCounter = 0;
        let lastTime = 0;
        let gameScore = 0;
        let dropInterval = 200; // Slower drop (was 40)

        function rotate(matrix) {
            const N = matrix.length;
            const M = matrix[0].length;
            let result = Array.from({ length: M }, () => Array(N).fill(0));
            for (let y = 0; y < N; ++y) {
                for (let x = 0; x < M; ++x) {
                    result[x][N - 1 - y] = matrix[y][x];
                }
            }
            return result;
        }

        function collide(board, piece) {
            for (let y = 0; y < piece.shape.length; ++y) {
                for (let x = 0; x < piece.shape[y].length; ++x) {
                    if (
                        piece.shape[y][x] !== 0 &&
                        (board[y + piece.y] === undefined || board[y + piece.y][x + piece.x] === undefined || board[y + piece.y][x + piece.x] !== 0)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        }

        function merge(board, piece) {
            piece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        board[y + piece.y][x + piece.x] = piece.color;
                    }
                });
            });
        }

        function clearLines() {
            let linesCleared = 0;
            outer: for (let y = ROWS - 1; y >= 0; --y) {
                for (let x = 0; x < COLS; ++x) {
                    if (board[y][x] === EMPTY) {
                        continue outer;
                    }
                }
                const row = board.splice(y, 1)[0].fill(EMPTY);
                board.unshift(row);
                ++y;
                linesCleared++;
            }
            if (linesCleared > 0) {
                gameScore += linesCleared * 10;
                setScore(gameScore);
            }
        }

        // AI Logic: Evaluate a board state
        function evaluateBoard(testBoard) {
            let score = 0;
            let holes = 0;
            let linesCleared = 0;
            let heights = new Array(COLS).fill(0);

            // Count lines cleared
            for (let y = 0; y < ROWS; y++) {
                if (testBoard[y].every(v => v !== EMPTY)) linesCleared++;
            }

            // Heights and Holes
            for (let x = 0; x < COLS; x++) {
                let columnFilled = false;
                for (let y = 0; y < ROWS; y++) {
                    if (testBoard[y][x] !== EMPTY) {
                        if (!columnFilled) {
                            heights[x] = ROWS - y;
                            columnFilled = true;
                        }
                    } else if (columnFilled) {
                        holes++;
                    }
                }
            }

            // Bumpiness
            let bumpiness = 0;
            for (let x = 0; x < COLS - 1; x++) {
                bumpiness += Math.abs(heights[x] - heights[x + 1]);
            }

            let totalHeight = heights.reduce((a, b) => a + b, 0);
            let maxHeight = Math.max(...heights);

            // Heuristic weights
            score = (linesCleared * 500)
                - (totalHeight * 5)
                - (maxHeight * 10)
                - (holes * 50)
                - (bumpiness * 2);

            return score;
        }

        function getBestMove(currentBoard, pieceTemplate) {
            let bestScore = -Infinity;
            let bestMove = { x: 0, rotations: 0, shape: pieceTemplate.shape };

            for (let r = 0; r < 4; r++) {
                let rotatedShape = pieceTemplate.shape;
                for (let i = 0; i < r; i++) rotatedShape = rotate(rotatedShape);

                for (let x = 0; x <= COLS - rotatedShape[0].length; x++) {
                    // Simulate drop to bottom
                    let y = 0;
                    while (!collide(currentBoard, { shape: rotatedShape, x, y: y + 1 })) {
                        y++;
                    }

                    // Temp board for evaluation
                    let tempBoard = currentBoard.map(row => [...row]);
                    rotatedShape.forEach((row, py) => {
                        row.forEach((value, px) => {
                            if (value !== 0) {
                                tempBoard[y + py][x + px] = pieceTemplate.color;
                            }
                        });
                    });

                    const moveScore = evaluateBoard(tempBoard);
                    if (moveScore > bestScore) {
                        bestScore = moveScore;
                        bestMove = { x, rotations: r, shape: rotatedShape };
                    }
                }
            }
            return bestMove;
        }

        function createPiece() {
            const typeId = Math.floor(Math.random() * TETROMINOS.length);
            const template = TETROMINOS[typeId];

            // AI decides the best position and rotation immediately
            const bestMove = getBestMove(board, template);

            return {
                shape: bestMove.shape,
                color: template.color,
                x: bestMove.x,
                y: 0
            };
        }

        function drawMatrix(matrix, offset) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== EMPTY) {
                        ctx.fillStyle = value % 2 === 0 ? "#A1A1AA" : "#FF5A00"; // Zinc or Orange
                        ctx.fillRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        ctx.strokeStyle = "#18181B";
                        ctx.strokeRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                });
            });
        }

        function draw() {
            ctx.fillStyle = "#09090b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#18181b"; // faint grid 
            ctx.lineWidth = 1;
            for (let i = 0; i <= COLS; i++) {
                ctx.beginPath();
                ctx.moveTo(i * BLOCK_SIZE, 0);
                ctx.lineTo(i * BLOCK_SIZE, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i <= ROWS; i++) {
                ctx.beginPath();
                ctx.moveTo(0, i * BLOCK_SIZE);
                ctx.lineTo(canvas.width, i * BLOCK_SIZE);
                ctx.stroke();
            }

            drawMatrix(board, { x: 0, y: 0 });
            if (piece) {
                drawMatrix(piece.shape, { x: piece.x, y: piece.y });
            }
        }

        let animationId;
        function update(time = 0) {
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;

            if (!piece) {
                piece = createPiece();
                if (collide(board, piece)) {
                    // Game Over - reset
                    board.forEach((row) => row.fill(EMPTY));
                    gameScore = 0;
                    setScore(gameScore);
                    piece = createPiece();
                }
            }

            if (dropCounter > dropInterval) {
                piece.y++;
                if (collide(board, piece)) {
                    piece.y--;
                    merge(board, piece);
                    clearLines();
                    piece = null;
                }
                dropCounter = 0;
            }

            draw();
            animationId = requestAnimationFrame(update);
        }

        update();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="relative border-4 border-zinc-800 bg-zinc-950 p-2 shadow-[8px_8px_0_0_rgba(249,115,22,0.1)] flex flex-col items-center w-fit mx-auto select-none mt-12 md:mt-0">
            <div className="absolute top-3 left-4 font-mono text-[10px] text-zinc-500 uppercase z-10 font-bold bg-zinc-950 px-1 border border-zinc-800">AI: LOGIC_OPTIMIZED</div>
            <div className="absolute top-3 right-4 font-mono text-[10px] text-orange-500 uppercase font-bold z-10 bg-zinc-950 px-1 border border-zinc-800">SCORE: {score}</div>

            <canvas
                ref={canvasRef}
                width={200}
                height={400}
                className="mt-6 border-2 border-zinc-900"
            />
            {/* CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-100" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
        </div>
    );
}
