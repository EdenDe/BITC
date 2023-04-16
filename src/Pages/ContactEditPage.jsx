import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import {Link} from 'react-router-dom'

export default class ContactEditPage extends Component {

  state = {
    contact: contactService.getEmptyContact()
  }

   componentDidMount=async()=>{
    const contactId = this.props.match.params.id
    if(contactId){
      try {
        const contact = await contactService.getContactById(contactId)
        this.setState({contact})
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;
      case 'checkbox':
        value = target.checked
        break;
      default:
        break;
    }
    this.setState(
      ({ contact }) => ({ contact: { ...contact, [field]: value } })
    )
  }

  onRemoveContact = async()=>{
    try {
      await contactService.deleteContact(this.state.contact._id)
      this.props.history.push('/contact')
    } catch (error) {
      console.log(error)
    }
  }

  onSaveContact = async (ev) =>{
    ev.preventDefault()
    try {
      await contactService.saveContact({...this.state.contact})
      this.props.history.push('/contact')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {contact} = this.state
    const {name, phone, email} = this.state.contact
    return (
      <section className="contact-edit">
        <Link to="/contact">back</Link>
        <h1>{contact._id? 'Edit' : 'Add' } Contact</h1>
        <form onSubmit={this.onSaveContact}>
          <label htmlFor='name'>Name</label>
          <input onChange={this.handleChange} value={name} type="text" name="name" id="name"/>

          <label htmlFor='phone'>Phone</label>
          <input onChange={this.handleChange} value={phone} type="tel" name="phone" id="phone"/>

          <label htmlFor='email'>Email</label>
          <input onChange={this.handleChange} value={email} type="email" name="email" id="email"/>

          <button type="button" onClick={this.onRemoveContact}>Delete</button>
          <button>Save</button>
        </form>
      </section>
    )
  }
}
