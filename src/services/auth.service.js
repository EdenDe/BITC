import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const authService = {
	getLoggedInUser,
	login,
	logout,
	signup,
	get,
	getEmptyUser,
	addMove,
}

function getEmptyUser() {
	return {
		username: '',
		coins: 100,
		moves: [],
	}
}

function getLoggedInUser() {
	const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	return JSON.parse(str)
}

async function login(credentials) {
	try {
		const users = await storageService.query(USER_KEY)
		const user = users.find(u => u.username === credentials.username)
		if (user) {
			sessionStorage.setItem(
				STORAGE_KEY_LOGGEDIN_USER,
				JSON.stringify(user)
			)
			return user
		} else {
			return Promise.reject('Invalid credentials')
		}
	} catch (error) {
		console.log(error)
	}
}

function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return Promise.resolve()
}

async function signup(credentials) {
	try {
		const users = (await storageService.query(USER_KEY)) || []

		let user = users.find(u => u.username === credentials.username)
		if (user) return Promise.reject('Username already taken')

		user = await storageService.post(USER_KEY, credentials)
		sessionStorage.setItem(
			STORAGE_KEY_LOGGEDIN_USER,
			JSON.stringify(user)
		)
		return user
	} catch (error) {
		console.log(error)
	}
}

function get(userId) {
	return storageService.get(USER_KEY, userId)
}

function addMove(contact, amount) {
	const user = getLoggedInUser()
	user.coins -= amount
	user.moves.push({
		amount,
		at: Date.now(),
		to: contact.name,
		toId: contact._id,
	})
	storageService.put(USER_KEY, user)
	sessionStorage.setItem(
		STORAGE_KEY_LOGGEDIN_USER,
		JSON.stringify(user)
	)
	return user
}
