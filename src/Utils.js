
import {
    ChainId,
    Token,
    Fetcher,
    Route,
} from '@uniswap/sdk'

const tokenUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const tokenUSDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const tokenDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const tokenETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

export class Maker {
    constructor(web) {
        this.web3 = web;
    }
    async init() {
        this.account = await this.web3.eth.getAccounts();
        this.walletAddress = this.account[0];
        this.USDT = new Token(ChainId.MAINNET, tokenUSDT, 6)
        this.USDC = new Token(ChainId.MAINNET, tokenUSDC, 6)
        this.ETH = new Token(ChainId.MAINNET, tokenETH,18)
        this.DAI = new Token(ChainId.MAINNET, tokenDAI, 18)

        this.duPair = await Fetcher.fetchPairData(this.DAI, this.USDT)
        this.uuPair = await Fetcher.fetchPairData(this.USDC, this.USDT)
        this.euPair = await Fetcher.fetchPairData(this.USDT, this.ETH)
        this.duRoute = new Route([this.duPair], this.DAI)
        this.uuRoute = new Route([this.uuPair], this.USDC)
        this.euRoute = new Route([this.euPair], this.ETH)
                //console.log(duRoute);

        this.priceDAI = this.duRoute.midPrice.toSignificant(6);
        this.priceUSDC = this.uuRoute.midPrice.toSignificant(6);
        this.priceETH = this.euRoute.midPrice.toSignificant(6);
        console.log(Math.round(this.priceDAI));
        console.log(Math.round(this.priceUSDC));
        console.log(this.priceETH);
        //console.log(Math.round(duRoute.midPrice.toSignificant(6))); 
        //console.log(Math.round(uuRoute.midPrice.toSignificant(6)));

        this.ABI = [
            // balanceOf
            {
                "constant": true,
                "inputs": [{
                    "name": "_owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "name": "balance",
                    "type": "uint256"
                }],
                "type": "function"
            },
        ];
        // Get ERC20 Token contract instance
        this.contractDAI = new this.web3.eth.Contract(this.ABI, tokenDAI);
        this.contractUSDC = new this.web3.eth.Contract(this.ABI, tokenUSDC);
        this.contractETH = new this.web3.eth.Contract(this.ABI, tokenETH);
      }
    
    async getBalance() {
        this.balanceDAI = await this.contractDAI.methods.balanceOf(this.walletAddress).call();
        this.balanceUSDC = await this.contractUSDC.methods.balanceOf(this.walletAddress).call();
        this.balanceETH= await this.contractETH.methods.balanceOf(this.walletAddress).call();
        return [this.balanceDAI,this.balanceUSDC,this.balanceETH];
    }
            
}