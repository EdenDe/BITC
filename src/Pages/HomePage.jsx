import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoins ,faBitcoinSign} from '@fortawesome/free-solid-svg-icons';

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
    this.setState({user :userService.getUser()}) 
  }

  loadBitcoinRate = async () =>{
    const bitcoinRate = await bitcoinService.getRate()
    this.setState({bitcoinRate :bitcoinRate }) 
  }

  render() {
    if (!this.state.user || !this.state.bitcoinRate) return <div>Loading...</div>

    const {name : userName, coins} = this.state.user
    const bitcoinRate = this.state.bitcoinRate
    return (
      <section className="homepage">
        <h1 className="homepage-title"> <span>Hello</span> {userName}!</h1>
        <div className='data-item'> 
          <div className="icon-wrapper tooltip flex justify-center" data-tooltip='Coins'> 
            <FontAwesomeIcon icon={faCoins}/>
          </div>
          <span> {coins}</span>
        </div>
        <div className='data-item'> 
          <div className="icon-wrapper tooltip flex justify-center" data-tooltip='BTC'>
            <FontAwesomeIcon icon={faBitcoinSign} />
          </div>
          <span> {bitcoinRate}</span>
        </div>
      </section>
    )
  }
}
