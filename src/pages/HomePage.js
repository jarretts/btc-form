import React from 'react'
import Price from '../components/Price'
import BuyForm from '../components/BuyForm'
import BuyHistory from '../components/BuyHistory'
import { AppBar, Toolbar, Container, Grid, Paper, Typography } from '@mui/material'
import btcApi from '../api/btc-api'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: undefined,
      cash: 100000,
      orders: []
    };
    
  }

  async getBtcPrice() {
    let btcPrice = await btcApi.btcChfPrice()
    this.setState({
      price: btcPrice
    });
  }  

  componentDidMount() {
    this.getBtcPrice();
    // refresh interval set at 2 seconds (instead of 1) due to limits on free API call
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getBtcPrice();
  }

  buyBTC(qty, amt) {
    const today = new Date();
    const dateTime = today.toLocaleDateString('en-CH') + ' ' + today.toLocaleTimeString('en-CH')
    const newOrder = {
      orderDate: dateTime,
      quantity: qty,
      amount: amt
    }
    this.setState({
      cash: this.state.cash - amt,
      orders: [...this.state.orders, newOrder]
    })
  };

  

  render() {

    return (
      <div className='HomePage'>
        
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" noWrap>
            ₿itcoin Trading Form
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              {/* Bitcoin Price */}
              <Grid item xs={12} md={7} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 270
                  }}
                >
                  <Price price={this.state.price} />
                </Paper>
              </Grid>

              {/* Buy Form */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 270,
                  }}
                >
                  <BuyForm 
                    price={this.state.price} 
                    cash={this.state.cash} 
                    buySubmit={this.buyBTC.bind(this)} 
                  />
                </Paper>
              </Grid>

              {/* Order History - conditionally rendered after first order is made */}
              <Grid item xs={12}>
                {
                  this.state.orders.length > 0 &&
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <BuyHistory orders={this.state.orders} />
                  </Paper>
                }
              </Grid>

            </Grid>
          </Container>
      </div>
    );
  }
  
}

export default HomePage