import React, { useEffect } from 'react'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {useSelector,useDispatch} from 'react-redux';
import {loadContacts,removeContact,setFilterBy} from '../store/actions/contact.action'

const ContactPage = ()=> {
  const contacts = useSelector((storeState)=> storeState.contactModule.contacts)
  const filterBy = useSelector((storeState)=> storeState.contactModule.filterBy)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadContacts())
  },[dispatch])


  const onRemoveContact= (contactId)=>{
    try {
      dispatch(removeContact(contactId))
      dispatch(loadContacts())
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeFilter=(filter = {})=>{
    dispatch(setFilterBy(filter))
    dispatch(loadContacts())
  }


  return (
    <section className="contact-page">
      <div className="flex space-between"> 
        <ContactFilter filter={filterBy} onChangeFilter={onChangeFilter} />
        <Link to="/contact/edit" className="btn-add-contact flex align-center">
          <FontAwesomeIcon icon={faUserPlus} />
        </Link>
      </div>
      <ContactList contacts={contacts} onRemoveContact={onRemoveContact}/>     
    </section>
  )
}

export default ContactPage