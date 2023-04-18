import { contactService } from '../../services/contact.service'
import {
	SET_CONTACTS,
	ADD_CONTACT,
	UPDATE_CONTACT,
	REMOVE_CONTACT,
	SET_FILTER,
} from '../reducers/contact.reducer'

export function loadContacts() {
	return async (dispatch, getState) => {
		try {
			const contacts = await contactService.query(
				getState().contactModule.filterBy
			)
			const action = {
				type: SET_CONTACTS,
				contacts,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function addContact(conatct) {
	return async dispatch => {
		try {
			const contacts = await contactService.saveContact(conatct)
			const action = {
				type: conatct._id ? UPDATE_CONTACT : ADD_CONTACT,
				contacts,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function removeContact(conatctId) {
	return async dispatch => {
		try {
			const contacts = await contactService.deleteContact(conatctId)
			const action = {
				type: REMOVE_CONTACT,
				contacts,
			}
			dispatch(action)
		} catch (error) {
			console.log('error:', error)
		}
	}
}

export function setFilterBy(filterBy) {
	return dispatch => {
		dispatch({ type: SET_FILTER, filterBy })
	}
}
