import React, { Component } from 'react'
import { contactService } from '../services/contact.service'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'

export default class ContactDetails extends Component {
  state = {
    contact: null
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.loadContact()
    }
  }

  loadContact = async () => {
    try {
      const contact = await contactService.getContactById(this.props.match.params.id)
      this.setState({ contact })
    } catch (error) {
      console.log('error:', error)
    }
  }

  onBack = () =>{
    this.props.history.push('/contact')
  }

  render() {
    const contact = this.state.contact
    if (!contact) return <Loader/>
    return (
      <section className='contact-details'>
        <section>
          <h3>Name: {contact.name}</h3>
        </section>
        <section>
          <h3>Phone: {contact.phone}</h3>
        </section>
        <section>
          <h3>Email: {contact.email}</h3>
        </section>
        <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${contact._id}`} alt={contact.name} />
        <Link to={`/contact/${contact.nextContactId}`}> next contact</Link>
        <Link to={`/contact/${contact.prevContactId}`}> prev contact</Link>

        <button className='btn-back' onClick={this.onBack}>Back</button>
      </section>
    )
  }
}
