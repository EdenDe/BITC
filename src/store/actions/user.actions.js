import { authService } from '../../services/auth.service'
import { SET_USER } from '../actions/user.actions'

export function spendBalance(conatct, amount) {
	return async dispatch => {
		try {
			const user = authService.addMove(conatct, amount)
			dispatch({ type: SET_USER, user })
		} catch (error) {
			console.log('error:', error)
		}
	}
}
