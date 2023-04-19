import React from 'react'
import ContactPreview from './ContactPreview'
import Loader from './Loader'

export default function ContactList({contacts,onRemoveContact}) {
  if(!contacts){
    return(<Loader/>)
  }
  return (
    <section className="contact-list simple-cards-grid">
      {
        contacts.map(contact => 
          <ContactPreview
           contact={contact} key={contact._id}
           onRemoveContact={onRemoveContact}
          />
        )
      }
    </section>
  )
}
