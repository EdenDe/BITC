import { authService } from '../../services/auth.service'
import { SET_USER } from '../reducers/user.reducer'

export function transferCoins(conatct, amount) {
	return async dispatch => {
		try {
			const user = authService.addMove(conatct, amount)
			dispatch({ type: SET_USER, user })
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function addUser(credentials) {
	return async dispatch => {
		try {
			const user = await authService.signup(credentials)
			dispatch({ type: SET_USER, user })
		} catch (error) {
			console.log('error:', error)
		}
	}
}
