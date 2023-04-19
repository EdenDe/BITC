import React, { useState, useEffect } from 'react'
import { contactService } from '../services/contact.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeContact, saveContact } from '../store/actions/contact.action';
import { useForm } from '../customHooks/useForm';
import Loader from '../components/Loader';

const ContactEditPage = ()=> {
  const params = useParams()

  const [contact, setContact] = useState(contactService.getEmptyContact())
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register,setFields] = useForm(contact,setContact)

  useEffect(()=>{
    getContact()
  },[])

  const getContact= async()=>{
    const contactId = params.id

    if(contactId){
      try {
        setFields(await contactService.getContactById(contactId)) 
      } catch (error) {
        console.log(error)
      }
    } 
  }
  

  const onRemoveContact = async()=>{
    try {
      if(contact._id){
        dispatch(removeContact(contact._id))
      }
      navigate('/contact')
    } catch (error) {
      console.log(error)
    }
  }

  const onSaveContact = async (ev) =>{
    ev.preventDefault()
    try {
      dispatch(saveContact(contact))
      navigate('/contact')
    } catch (error) {
      console.log(error)
    }
  }

    if(!contact) return <Loader/>

    return (
      <section className="contact-edit">
        <h1>{contact._id? 'Edit' : 'Add' } Contact</h1>
        <div className="card">
          <button type="button" onClick={onRemoveContact} className="btn-delete">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <div className="img-wrapper flex justify-center">
            {contact._id &&<img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${contact._id}`} alt={contact.name} />}
          </div>
          <form onSubmit={onSaveContact}>
            <label htmlFor='name'>Name</label>
            <input {...register('name')}/>

            <label htmlFor='phone'>Phone</label>
            <input {...register('phone','tel')}/>

            <label htmlFor='email'>Email</label>
            <input {...register('email','email')}/>
           
            <button className="btn-save">Save</button>    
          </form>
        </div>
      </section>
    )
  }



export default ContactEditPage