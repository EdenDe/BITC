import React, { useState,useEffect } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoins ,faBitcoinSign} from '@fortawesome/free-solid-svg-icons';
import MovesList from '../components/MovesList';
import {useSelector} from 'react-redux';
import {useNavigate } from 'react-router-dom'

const HomePage =()=> {
  const user = useSelector((storeState)=> storeState.userModule.loggedInUser)
  const [bitcoinRate,setBitcoinRate] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    loadBitcoinRate()  
  },[])


  const loadBitcoinRate = async () =>{
    const bitcoinRate = await bitcoinService.getRate()
    setBitcoinRate(bitcoinRate) 
  }

  if(!user){
    navigate('/signup')
  }

  return (
      <section className="homepage">
        <section className="homepage-details"> 
          <h1 className="homepage-title"> <span>Hello</span> {user.username}!</h1>
          <div className='data-item'> 
            <div className="icon-wrapper tooltip flex justify-center" data-tooltip='Coins'> 
              <FontAwesomeIcon icon={faCoins}/>
            </div>
            <span>{user.coins}</span>
          </div>
          <div className='data-item'> 
            <div className="icon-wrapper tooltip flex justify-center" data-tooltip='BTC'>
              <FontAwesomeIcon icon={faBitcoinSign} />
            </div>
            <span> {bitcoinRate}</span>
          </div>
        </section>
       {user.moves.length && <MovesList moves={user.moves.slice(0,3)} title="Your last 3 Moves"/>}

      </section>
    )
  
}

export default HomePage