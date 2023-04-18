import React, { Component } from 'react'
import {contactService} from '../services/contact.service'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { SET_CONTACT } from '../store/reducers/contact.reducer'

class _ContactPage extends Component {

  componentDidMount(){
    this.loadContacts()
  }

  loadContacts = async ()=>{
    try {
      const contacts = await contactService.getContacts(this.props.filterBy)
      const action = {
        type: SET_CONTACT,
        contacts
      }
      this.props.dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }

  onRemoveContact= async (contactId)=>{
    try {
      // await contactService.deleteContact(contactId)
      // this.setState(({contacts})=> ({
      //   contacts: contacts.filter(contact=> contact._id !== contactId)
      // }))

    } catch (error) {
      console.log(error)
    }
  }

  onChangeFilter=(filterBy)=>{
    //this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const {contacts,filterBy} = this.props
    if(!contacts) return <div>Loading...</div>
    return (
      <section className="contact-page">
        <div className="flex space-between"> 
          <ContactFilter filterBy={filterBy} onChangeFilter={this.onChangeFilter} />
          <Link to="/contact/edit" className="btn-add-contact flex align-center">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </div>
        <ContactList contacts={contacts} onRemoveContact={this.onRemoveContact}/>     
      </section>
    )
  }
}

const mapStateToProps = (state)=> ({
  contacts: state.contacts,
  filterBy: state.filterBy,
})

export const ContactPage = connect(mapStateToProps)(_ContactPage)
