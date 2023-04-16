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
        <div className="card">
          <div className="img-wrapper">
            <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${contact._id}`} alt={contact.name} />
          </div>
          <div className="card-details flex column justify-center">        
            <h3>{contact.name}</h3>
            <h3>{contact.phone}</h3>       
            <h3>{contact.email}</h3>
          </div>
        </div>
        
        <div className="card-actions flex space-between">
          <Link to={`/contact/${contact.prevContactId}`}> PREV </Link>
          <Link to={`/contact/${contact.nextContactId}`}> NEXT </Link>
         </div>
      </section>
    )
  }
}
