import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'

const ERC20_ABI = require('./abis/erc20.json');

export class BNB {
	constructor() {
		this.web3 = new Web3(window.ethereum);
		this.defaultGasPrice = 20000000000;
		this.decimals = 18;
		this.symbol = "BNB";
	}
	
	async balanceOf(user) {
		let balance = await this.web3.eth.getBalance(user, "latest");
		return new BigNumber(balance).shiftedBy(-this.decimals);
	}

	async getPrecision() {
		return BigNumber(10).pow(BigNumber(this.decimals));
	}

	async getSymbol() {
		return this.symbol;
	}

	async allowance(owner, spender) {
		let allowedBalance = await this.contract.methods.allowance(owner, spender).call();
		let precision = await this.getPrecision()
		return BigNumber(allowedBalance).div(precision);
	}
}

export default BNB;