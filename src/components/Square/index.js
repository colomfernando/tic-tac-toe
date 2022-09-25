import React from 'react';
import styles from './Square.module.scss';

const Square = ({ value, cb, disabled }) => {
	return (
		<button onClick={cb} disabled={disabled} className={styles.square}>
			{value}
		</button>
	);
};

export default Square;
