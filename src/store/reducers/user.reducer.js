import { authService } from '../../services/auth.service'

export const SET_USER = 'SET_USER'

const INITIAL_STATE = {
	loggedInUser: authService.getLoggedInUser(),
}

export function userReducer(state = INITIAL_STATE, action = {}) {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				loggedInUser: { ...action.user },
			}

		default:
			return state
	}
}
