import axios from 'axios'
import { utilService } from './util.service'

export const bitcoinService = {
	getRate,
	getMarketPrice,
	getConfirmedTransaction,
}

const RATE_KEY = 'rateDB'
const MARKET_PRICE_KEY = 'marketPriceDB'
const CON_TRANS_KEY = 'conTransactionDB'

let rateInfo = utilService.loadFromStorage(RATE_KEY) || null
let marketPrice =
	utilService.loadFromStorage(MARKET_PRICE_KEY) || null
let conTrans = utilService.loadFromStorage(CON_TRANS_KEY) || null

async function getRate() {
	try {
		if (rateInfo && !_passedMoreThanADay(rateInfo.lastSearch))
			return Promise.resolve(rateInfo.rate)

		const rate = await axios.get(
			'https://blockchain.info/tobtc?currency=USD&value=1'
		)

		rateInfo = {
			rate: rate.data,
			lastSearch: new Date(),
		}
		_saveInfo(RATE_KEY, rateInfo)
		return rateInfo.rate
	} catch (error) {
		console.log(error)
	}
}

async function getMarketPrice() {
	try {
		if (marketPrice && !_passedMoreThanADay(marketPrice.lastSearch))
			return Promise.resolve(marketPrice.values)

		const info = await axios.get(
			'https://api.blockchain.info/charts/market-price?timespan=3months&format=json&cors=true'
		)
		marketPrice = {
			values: info.data.values,
			lastSearch: new Date(),
		}

		_saveInfo(MARKET_PRICE_KEY, marketPrice)
		return marketPrice.values
	} catch (error) {
		console.log(error)
	}
}

async function getConfirmedTransaction() {
	try {
		if (conTrans && !_passedMoreThanADay(conTrans.lastSearch))
			return Promise.resolve(conTrans.values)

		const info = await axios.get(
			'https://api.blockchain.info/charts/trade-volume?timespan=3months&format=json&cors=true'
		)

		conTrans = {
			values: info.data.values,
			lastSearch: new Date(),
		}

		_saveInfo(CON_TRANS_KEY, conTrans)
		return conTrans.values
	} catch (error) {}
}

function _passedMoreThanADay(date) {
	var oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
	return date < oneDay
}

function _saveInfo(key, value) {
	utilService.saveToStorage(key, value)
}
