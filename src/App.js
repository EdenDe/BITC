import HomePage from './pages/HomePage'
import Contact from './pages/ContactPage'
import StatisticPage from './pages/StatisticPage'
import './assets/scss/global.scss'
import { AppHeader } from './components/AppHeader'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import ContactDetails from './pages/ContactDetailsPage'
import ContactEditPage from './pages/ContactEditPage'

export default function App() {
	return (
		<Router>
			<section className="main-layout">
				<AppHeader />

				<main className="main-container-layout">
					<div className="screen"></div>
					<Switch>
						<Route
							path="/contact/edit/:id?"
							component={ContactEditPage}
						/>
						<Route path="/contact/:id" component={ContactDetails} />
						<Route path="/contact" component={Contact} />
						<Route path="/statistic" component={StatisticPage} />
						<Route exact path="/" component={HomePage} />
					</Switch>
				</main>

				<footer className="full footer flex auto-center">
					<section>Copyright 2023 &copy;</section>
				</footer>
			</section>
		</Router>
	)
}
