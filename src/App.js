import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import StatisticPage from './pages/StatisticPage'
import './assets/scss/global.scss'
import AppHeader from './components/AppHeader'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import ContactDetails from './pages/ContactDetailsPage'
import ContactEdit from './pages/ContactEditPage'
import SignupPage from './pages/SignupPage'

export default function App() {
	return (
		<Router>
			<section className="main-layout">
				<AppHeader />

				<main className="main-container-layout">
					<div className="screen"></div>
					<Routes>
						<Route
							path="/contact/edit/:id?"
							element={<ContactEdit />}
						/>
						<Route path="/contact/:id" element={<ContactDetails />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/statistic" element={<StatisticPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>

				<footer className="full footer flex auto-center">
					<section>Copyright 2023 &copy;</section>
				</footer>
			</section>
		</Router>
	)
}
