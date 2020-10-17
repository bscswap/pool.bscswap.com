import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
BigNumber.set({ ROUNDING_MODE: 1 })

const WBNB_ABI = require('./abis/wbnb.json');

export class Wbnb {
	constructor(address, symbol, decimals) {
		this.web3 = new Web3(window.detectProvider);
		this.address = address;
		this.contract = new this.web3.eth.Contract(WBNB_ABI, address)
		this.decimals = decimals;
		this.symbol = symbol;
		this.defaultGasPrice = 20000000000;
	}

	async balanceOf(user) {
		let balance = await this.contract.methods.balanceOf(user).call();
		let precision = await this.getPrecision()
		return new BigNumber(balance).div(precision).toFixed(8, 1);
	}

	async getPrecision() {
		let decimals = this.decimals || await this.contract.methods.decimals().call();
		return BigNumber(10).pow(BigNumber(decimals));
	}

	async getSymbol() {
		return this.symbol || await this.contract.methods.symbol().call();
	}

  async withdraw(sender, to, amount, callback) {
	  var gasPrice = this.defaultGasPrice
	  var tx = this.contract.methods.withdraw(toBN(new BigNumber(amount).shiftedBy(18)));
	  let gasLimit = 40000
	  try {
	  	gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address })
	  } catch(err) {
	  }
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}
}

export default Wbnb;
