import HomePage from './Pages/HomePage/HomePage'
import './assets/scss/global.scss'

function App() {
	return (
		<section className="main-app">
			<header className="app-header">
				<section className="container">
					<h1>Contacts</h1>
				</section>
			</header>

			<main className="container">
				<HomePage />
			</main>

			<footer>
				<section className="container">
					ContactRights 2023 &copy;
				</section>
			</footer>
		</section>
	)
}

export default App
