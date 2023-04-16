import React from 'react'
import ContactPreview from './ContactPreview'
export default function ContactList({contacts,onRemoveContact}) {
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
