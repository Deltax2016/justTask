import React, {
    Component
} from "react";

class Metamask extends React.Component {
   /*constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    componentDidMount = async() => {
        try {
            const chainId = ChainId.MAINNET
            const decimals = 18
            const web3 = new Web3(window.ethereum);
            // get all accounts
            const accounts = web3.eth.getAccounts();
            let tokenAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
            let tokenAddress2 = "0x6b175474e89094c44da98b954eedeac495271d0f";
            let walletAddress = "0x73c38e1498102Cd42E402511455e6F95F8Dd1606";
            //const DAI = new Token(chainId, tokenAddress, decimals);
            const USDC = new Token(chainId, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
            const DAI = new Token(chainId, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 6)
            const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)
            const route = new Route([DAIUSDCPair], USDC)
            console.log(Math.round(route.midPrice.toSignificant(6))); // 202.081

            let minABI = [
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
            let contract = new web3.eth.Contract(minABI, tokenAddress);
            async function getBalance() {
                let balance = await contract.methods.balanceOf(walletAddress).call();
                return balance;
            }
            getBalance().then(function(result) {
                console.log(result);
            });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };*/
    render() {
        return <h1 > Привет, {
            this.props.name
        } < /h1>;
    }
}