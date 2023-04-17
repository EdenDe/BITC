import { legacy_createStore as createStore } from 'redux'
import { contactReducer } from './reducers/contact.reducer'

export const store = createStore(contactReducer)
