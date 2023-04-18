import React, { Component } from 'react'

import { bitcoinService } from '../services/bitcoin.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoins ,faBitcoinSign} from '@fortawesome/free-solid-svg-icons';
import { authService } from '../services/auth.service';
import MovesList from '../components/MovesList';

export default class HomePage extends Component {

  state = {
    user: null,
    bitcoinRate : null,
  }

  componentDidMount(){
    this.loadUser()
    this.loadBitcoinRate()
  }

  loadUser =()=>{
    const user = authService.getLoggedInUser()
    if(user)this.setState({user})
    else this.props.history.push('/signup')
  }

  loadBitcoinRate = async () =>{
    const bitcoinRate = await bitcoinService.getRate()
    this.setState({bitcoinRate :bitcoinRate }) 
  }

  render() {
    if (!this.state.user || !this.state.bitcoinRate) return <div>Loading...</div>

    const {userName, coins,moves} = this.state.user
    console.log(userName)
    const bitcoinRate = this.state.bitcoinRate
    return (
      <section className="homepage">
        <section className="homepage-details"> 
          <h1 className="homepage-title"> <span>Hello</span> {userName}!</h1>
          <div className='data-item'> 
            <div className="icon-wrapper tooltip flex justify-center" data-tooltip='Coins'> 
              <FontAwesomeIcon icon={faCoins}/>
            </div>
            <span>{coins}</span>
          </div>
          <div className='data-item'> 
            <div className="icon-wrapper tooltip flex justify-center" data-tooltip='BTC'>
              <FontAwesomeIcon icon={faBitcoinSign} />
            </div>
            <span> {bitcoinRate}</span>
          </div>
        </section>
       {moves.length && <MovesList moves={moves.slice(3)} title="Your last 3 Moves"/>}

      </section>
    )
  }
}
