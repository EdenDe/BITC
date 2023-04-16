import React, { Component } from 'react'
import {contactService} from '../services/contact.service'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'
import {Link} from 'react-router-dom'

export default class ContactPage extends Component {

  state = {
    contacts: null,
    filterBy:''
  }

  componentDidMount(){
    this.loadContacts()
  }

  loadContacts = async ()=>{
    const contacts = await contactService.getContacts(this.state.filterBy)
    this.setState({contacts})
  }

  onRemoveContact= async (contactId)=>{
    try {
      await contactService.deleteContact(contactId)
      this.setState(({contacts})=> ({
        contacts: contacts.filter(contact=> contact._id !== contactId)
      }))

    } catch (error) {
      console.log(error)
    }
  }

  onChangeFilter=(filterBy)=>{
    this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const {contacts,filterBy} = this.state
    if(!contacts) return <div>Loading...</div>
    return (
      <section>
        <ContactFilter filterBy={filterBy} onChangeFilter={this.onChangeFilter} />
        <Link to="/contact/edit"> Add Contact</Link>
        <ContactList contacts={contacts} onRemoveContact={this.onRemoveContact}/>     
      </section>
    )
  }
}
