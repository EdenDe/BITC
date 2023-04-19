import React, { useState,useEffect } from 'react'
import { contactService } from '../services/contact.service'
import Loader from '../components/Loader'
import {Link,useParams} from 'react-router-dom'
import {TransferFund} from '../components/TransferFund'
import MovesList from '../components/MovesList'
import { useDispatch,useSelector } from 'react-redux'
import { transferCoins} from '../store/actions/user.actions'

const ContactDetails = ()=> {
  const [contact, setContact] = useState(null)
  const user = useSelector(storeState=> storeState.userModule.loggedInUser)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    loadContact()
  },[params.id])


  const loadContact = async () => {
    try {
      const contact = await contactService.getContactById(params.id)
      setContact(contact)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const onTransferAmount=(amount)=>{
    dispatch(transferCoins(contact,amount))
  }

  const getMoveList=()=>{
    return user.moves.filter(move=> move.toId === contact._id)
            .map(move=> {
              delete move.to
              return move
            })
     
  }

  if(!contact){
    return <Loader/>
  }
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
        
        <TransferFund contactName={contact.name} maxAmount={user.coins} transferAmount={onTransferAmount}/>
        <MovesList moves={getMoveList()} title="Your Moves"/>
      </section>
    )
  
}


export default ContactDetails