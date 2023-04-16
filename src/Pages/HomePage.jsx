import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

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
      <>
        <h2>Hello {userName}!</h2>
        <div> 
          <span>icon</span>
          <span>Coins: {coins}</span>
        </div>
        <div> 
          <span>icon</span>
          <span>BTC: {bitcoinRate}</span>
        </div>
      </>
    )
  }
}
