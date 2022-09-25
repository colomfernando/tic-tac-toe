import styles from './App.module.scss';
import Board from './components/Board';

const App = () => {
	return (
		<div className={styles.app}>
			<header className={styles.appHeader}>
				<h2>Tic Tac Toe</h2>
			</header>
			<div className={styles.appBody}>
				<Board />
			</div>
		</div>
	);
};

export default App;
