import React from 'react'
import { useState } from "react";
import Board from './Board'

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);
    
    const handleClick = (i) => {
        const _history = history.slice();
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([{ squares: squares }]));
        setXIsNext(!xIsNext);
    }

    const _history = history.slice();
    const current = _history[_history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares = {current.squares}
                    xIsNext = {xIsNext}
                    onClick = {(i) => handleClick(i)}
                 />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;