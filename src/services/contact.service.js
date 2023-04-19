import contacts from '../data/contacts.json'
import { utilService } from './util.service'

export const contactService = {
	getContacts,
	getContactById,
	deleteContact,
	saveContact,
	getEmptyContact,
}

const KEY_CONTACTS = 'contactsDB'

let gContacts

_loadContacts()

function sort(arr) {
	return arr.sort((a, b) => {
		if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
			return -1
		}
		if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
			return 1
		}

		return 0
	})
}

function getContacts(filterBy = null) {
	return new Promise((resolve, reject) => {
		if (!gContacts) _loadContacts()
		var contactsToReturn = gContacts

		if (filterBy) {
			contactsToReturn = filter(filterBy)
		}
		resolve(sort(contactsToReturn))
	})
}

function getContactById(id) {
	return new Promise((resolve, reject) => {
		let contact = gContacts.find(contact => contact._id === id)
		if (contact) {
			contact = _setNextPrevContactId(contact)

			resolve(contact)
		} else {
			reject(`Contact id ${id} not found!`)
		}
	})
}

async function _setNextPrevContactId(contact) {
	return getContacts().then(contacts => {
		const contactIdx = contacts.findIndex(
			currContact => currContact._id === contact._id
		)
		contact.nextContactId = contacts[contactIdx + 1]
			? contacts[contactIdx + 1]._id
			: contacts[0]._id
		contact.prevContactId = contacts[contactIdx - 1]
			? contacts[contactIdx - 1]._id
			: contacts[contacts.length - 1]._id
		return contact
	})
}

function deleteContact(id) {
	return new Promise((resolve, reject) => {
		const index = gContacts.findIndex(contact => contact._id === id)
		if (index !== -1) {
			gContacts.splice(index, 1)
		}
		_saveContacts()
		resolve(gContacts)
	})
}

function _updateContact(contact) {
	return new Promise((resolve, reject) => {
		const index = gContacts.findIndex(c => contact._id === c._id)
		if (index !== -1) {
			gContacts[index] = contact
		}
		_saveContacts()
		resolve(contact)
	})
}

function _addContact(contact) {
	return new Promise((resolve, reject) => {
		contact._id = utilService.makeId()
		gContacts.push(contact)
		_saveContacts()
		resolve(contact)
	})
}

function saveContact(contact) {
	return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
	return {
		name: '',
		email: '',
		phone: '',
	}
}

function filter(term) {
	const regex = new RegExp(term, 'i')
	return gContacts.filter(
		contact => regex.test(contact.name) || regex.test(contact.phone)
	)
}

function _saveContacts() {
	utilService.saveToStorage(KEY_CONTACTS, gContacts)
}

function _loadContacts() {
	gContacts = utilService.loadFromStorage(KEY_CONTACTS)
	if (!gContacts) {
		gContacts = contacts
		_saveContacts()
	}
}
