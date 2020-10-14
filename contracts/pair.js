import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import config from  '~/config'

const UNISWAP_PAIR = require('./abis/uniswap_pair.json');

export class Pair {
	constructor() {
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
	}

	async getPriceOfBSWAPUSDT() {
		let cow = config.cows.find((t) => t.id == "1");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[0] / reserves[1]
	}

	async getPriceOfRABBITUSDT() {
		let cow = config.cows.find((t) => t.id == "5");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[0] / reserves[1]
	}

	async getPriceOfMOONUSDT() {
		let cow = config.cows.find((t) => t.id == "13");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[0] / reserves[1]
	}

	async getPriceOfBHCBNB() {
		let cow = config.cows.find((t) => t.id == "17");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[1] / reserves[0]
	}

	async getPriceOfEARTHBNB() {
		let cow = config.cows.find((t) => t.id == "18");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[1] / reserves[0]
	}

	async getPriceOfDEGENBNB() {
		let cow = config.cows.find((t) => t.id == "20");
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, cow.bscswap)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[1] / reserves[0]
	}

	async getPriceOfBUSDBNB() {
		this.address = config.pair_BUSD_BNB;
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, this.address)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[0] / reserves[1]
	}

	async getPriceOfBNBBUSD() {
		this.address = config.pair_BUSD_BNB;
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, this.address)
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[1] / reserves[0]
	}
}

export default Pair;
