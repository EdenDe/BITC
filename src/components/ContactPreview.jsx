import React from 'react'
import {Link} from 'react-router-dom'

export default function ContactPreview({contact,onRemoveContact}) {

  const contactStyle = { backgroundImage: `url(https://robohash.org/${contact._id}?set=set4)` }

  return (
    <article style={contactStyle} className="contact-preview">
      <Link to={`/contact/${contact._id}`} className="info"> 
        <h2>{contact.name}</h2> 
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveContact(contact._id)}>X</button>
        <Link to={`/contact/edit/${contact._id}`}>edit</Link>
      </section>
    </article>
  )
}
