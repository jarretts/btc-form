import React from 'react'
import { Typography, Grid } from '@mui/material'

// Used class component here only to demonstrate both class and functional components in project

class Price extends React.Component {

  render() {
    return (

      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" sx={{ display: "flex", justifyContent: "flex-start" }}>
          Bitcoin Price
        </Typography>
        <br /><br /><br />
        <Grid container spacing={2}>
          <Grid item xs={9} style={{ display: "flex", justifyContent: "flex-end", alignItems:"flex-end" }}>
            <Typography component="p" variant="h1" >
              {this.props.price}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-start", alignItems:"center" }}>
            <Typography component="p" variant="h5" >
              CHF
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
}

export default Price;