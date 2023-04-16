import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function ContactPreview({contact,onRemoveContact}) {

  return (
    <Link to={`/contact/${contact._id}`} className="contact-preview flex column"> 
      <div className="img-wrapper flex justify-center">
        <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${contact._id}`} alt={contact.name} />
      </div>
      <h2>{contact.name}</h2> 
      <section className="actions flex align-center">
        <button onClick={() => onRemoveContact(contact._id)} className="icon-wrapper">
           <FontAwesomeIcon icon={faX} />
        </button>
        <Link to={`/contact/edit/${contact._id}`} className="icon-wrapper">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      </section>
    </Link>
  )
}
