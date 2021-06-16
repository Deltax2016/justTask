import Web3 from 'web3';
import { Maker } from './Utils.js';
//import { Metamask } from './Utils';
import React, {
    Component
} from "react";

import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "./App.css";


function createData(name, balance, rate) {
  return { name, balance, rate };
}

const rows = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isCompleted: 0
    };
}

    componentDidMount = async() => {
      //тут могла бы быть ваша реклама
    };
    

    handleClick = async() => {
        try {

            this.setState({isCompleted: 2});

            var web3 = new Web3(window.web3.currentProvider);
            await window.ethereum.enable();
            var maker = new Maker(web3);
            await maker.init();

            //web3.eth.getAccounts().then();
            await maker.getBalance().then(function(result) {
                console.log(result);
                rows.push(createData('ETH',result[2],maker.priceETH));
                rows.push(createData('USDC',result[1],Math.round(maker.priceUSDC)));
                rows.push(createData('DAI',result[0],Math.round(maker.priceDAI)));
            });
            

            console.log(rows)
            this.setState({isCompleted: 1});
            

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Парниша, а метамаск кто включать будет?`,
            );
            console.error(error);
        }
    }

    render() {
        if (!this.state.web3) {
          //const classes = useStyles();
            return (
    <div>
    <h1>{this.state.isCompleted ? 'Metamask status: Connected' : 'Metamask status: Disconnected' }</h1>
    {!this.state.isCompleted &&
    <Button align="center" variant="outlined" color="primary" onClick={this.handleClick}>Conect to Metamask</Button>
   }
    {this.state.isCompleted == 2 &&
    <h1>Ждём-с..</h1>}
    {this.state.isCompleted == 1 && 
    <TableContainer component={Paper} >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Монета</TableCell>
            <TableCell align="center">Мой баланс</TableCell>
            <TableCell align="center">Средний курс (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.balance}</TableCell>
              <TableCell align="center">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>
              );
        }
    }
}

export default App;