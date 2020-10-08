export default ({ store }, inject) => {
    inject('onConnect', async () => {
        return new Promise((resolve, reject) => {
            let timer = setInterval(async () => {
                if(window.BinanceChain) {
                    if(window.BinanceChain.on) {
                        window.BinanceChain.on('accountsChanged', function (accounts) {
                            store.commit('updateConnectedAccount', accounts[0]);
                            let chainId = window.web3.toBigNumber(window.BinanceChain.chainId).toNumber();
                            store.commit('updateChainId', chainId);
                        });
                    }

                    if(!window.web3.eth.defaultAccount) {
                       window.BinanceChain.enable().then(accounts => {
                           store.commit('updateConnectedAccount', accounts[0]);
                           let chainId = window.web3.toBigNumber(window.BinanceChain.chainId).toNumber();
                           store.commit('updateChainId', chainId);
                           store.commit('checkWallet', window.BinanceChain.isMathWallet);
                       });
                    }
                    store.commit('updateConnectedAccount', window.web3.eth.defaultAccount);
                    let chainId = window.web3.toBigNumber(window.BinanceChain.chainId).toNumber();
                    store.commit('updateChainId', chainId);
                    store.commit('checkWallet', window.BinanceChain.isMathWallet);
                    clearInterval(timer)
                    resolve()
                } else if(window.ethereum) {
                    if(window.ethereum.on) {
                        window.ethereum.on('accountsChanged', function (accounts) {
                            store.commit('updateConnectedAccount', accounts[0]);
                            let chainId = window.web3.toBigNumber(window.ethereum.chainId).toNumber();
                            store.commit('updateChainId', chainId);
                            if(/MathWallet/i.test(window.navigator.userAgent)){
                              store.commit('checkWallet', window.ethereum.isMathWallet);
                            }
                        });
                    }

                    if(!window.web3.eth.defaultAccount) {
                       window.ethereum.enable().then(accounts => {
                           store.commit('updateConnectedAccount', accounts[0]);
                           let chainId = window.web3.toBigNumber(window.ethereum.chainId).toNumber();
                           store.commit('updateChainId', chainId);
                           store.commit('checkWallet', window.ethereum.isMathWallet);
                           if(/MathWallet/i.test(window.navigator.userAgent)){
                              store.commit('checkWallet', window.ethereum.isMathWallet);
                           }
                       });
                    }
                    store.commit('updateConnectedAccount', window.web3.eth.defaultAccount);
                    let chainId = window.web3.toBigNumber(window.ethereum.chainId).toNumber();
                    store.commit('updateChainId', chainId);
                    store.commit('checkWallet', window.ethereum.isMathWallet);
                    if(/MathWallet/i.test(window.navigator.userAgent)){
                      store.commit('checkWallet', window.ethereum.isMathWallet);
                    }
                    clearInterval(timer)
                    resolve()
                }
            }, 10);
        });
    })
}
