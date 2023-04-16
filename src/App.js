import HomePage from './Pages/HomePage'
import Contact from './Pages/ContactPage'
import StatisticPage from './Pages/StatisticPage'
import './assets/scss/global.scss'
import { AppHeader } from './components/AppHeader'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import ContactDetails from './Pages/ContactDetailsPage'
import ContactEditPage from './Pages/ContactEditPage'

export default function App() {
	return (
		<Router>
			<section className="main-app">
				<AppHeader />

				<main className="container">
					<Switch>
						<Route
							path="/contact/edit/:id?"
							component={ContactEditPage}
						/>
						<Route path="/contact/:id" component={ContactDetails} />
						<Route path="/contact" component={Contact} />
						<Route path="/statistic" component={StatisticPage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</main>

				<footer>
					<section className="container">
						ContactRights 2023 &copy;
					</section>
				</footer>
			</section>
		</Router>
	)
}
