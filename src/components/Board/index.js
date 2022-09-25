import React, { useState, useRef } from 'react';
import styles from './Board.module.scss';
import Square from '../Square';

const winnerPosibilites = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const mapMove = {
	X: 'O',
	O: 'X',
};

const Board = () => {
	const [squares, setSquares] = useState(Array.from({ length: 9 }, () => ''));
	const refGame = useRef({ lastMove: '', hasWinner: false });

	const setRef = (data) => (refGame.current = { ...refGame.current, ...data });

	const getNextMove = () => {
		const nextMove = mapMove[refGame.current.lastMove] || 'X';
		setRef({ lastMove: nextMove });
		return nextMove;
	};

	const handleOnClickSquare = (idx, value) => {
		if (squares[idx]) return null;
		const newArr = [...squares];
		newArr[idx] = value;
		setSquares(newArr);
		const isWinner = validateMove(newArr);
		if (isWinner) setRef({ hasWinner: true });
	};

	const resetGame = () => {
		setSquares(Array.from({ length: 9 }, () => ''));
		setRef({ lastMove: '', hasWinner: false });
	};

	const validateMove = (state) => {
		const winner = winnerPosibilites.filter((moves) => {
			const result = moves.map((move) => state[move]).filter(Boolean);
			if (result.length !== 3) return null;
			if ([...new Set(result)].length !== 1) return null;
			return result;
		});
		return winner.length ? true : false;
	};

	return (
		<div className={styles.wrapper}>
			{refGame.current.hasWinner && (
				<span
					className={styles.winner}
				>{`Winner ${refGame.current.lastMove}`}</span>
			)}
			<div className={styles.board}>
				{squares.map((value, idx) => (
					<Square
						key={idx.toString()}
						value={value}
						cb={() => handleOnClickSquare(idx, getNextMove())}
						disabled={refGame.current.hasWinner}
					/>
				))}
			</div>

			<button className={styles.reset} onClick={resetGame}>
				{refGame.current.hasWinner ? 'play again' : 'reset'}
			</button>
		</div>
	);
};

export default Board;
