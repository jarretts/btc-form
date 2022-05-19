import React from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

export default function BuyHistory(props) {
  
  const orderRows = props.orders.map(order => (
    <TableRow key={order['orderDate']}>
      <TableCell>{order['orderDate']}</TableCell>
      <TableCell>{order['quantity']}</TableCell>
      <TableCell>{order['amount']}</TableCell>
    </TableRow>
  ))

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Order History
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Date</TableCell>
            <TableCell>Quantity (BTC)</TableCell>
            <TableCell>Amount (CHF)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orderRows}
        </TableBody>
        
      </Table>

    </React.Fragment>
  )
}