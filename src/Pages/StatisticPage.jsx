import React, { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import Chart from '../components/Chart'
import Loader from '../components/Loader'

export default class StatisticPage extends Component {
  state = {
    marketprice: null,
    conTrans: null
  }

  componentDidMount() {
      this.loadConTrans()
      this.loadMarketprice()
  }

  loadConTrans = async () => {
      try {
          const conTrans = await bitcoinService.getConfirmedTransaction()
          this.setState({ conTrans })
      } catch (error) {
          console.log('error:', error)
      }
  }

  loadMarketprice = async () => {
    try {
        const marketprice = await bitcoinService.getMarketPrice()
        this.setState({ marketprice })
    } catch (error) {
        console.log('error:', error)
    }
}


  render() {
    const {marketprice, conTrans} = this.state
    if(!marketprice || !conTrans) return <Loader/>
    return (
      <section>
        <h2> Market Price in the last 3 month </h2>
        <Chart data={marketprice.map(x=> x.y)} color="red"/>

        <h2> Confirmed Transitions in the last 3 month </h2>
        <Chart data={conTrans.map(x=> x.y)} color="blue"/>
      </section>
     
    )
  }
}
