import React from "react"
import { MenuItem, FormControl, Select, TextField, Stack, Button, Typography } from "@mui/material"

export default function BuyForm(props) {
    const [formData, setFormData] = React.useState(
        {
          quantity: 0.00, 
          amount: 0.00,
          qOrA: "quantity"
        }
    )
    
    function handleChange(event) {
        const {value} = event.target
        setFormData(prevFormData => {
            if (formData.qOrA === "quantity") {
              return {
                ...prevFormData,
                quantity: value,
                amount: value * props.price
              }
            } else {
              return {
                ...prevFormData,
                quantity: value / props.price,
                amount: value
              }
            }
        })
    }

    function handleSelectChange(event) {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          qOrA: event.target.value
        }
      })
    }

    function handleSubmit(event) {
      event.preventDefault();
      props.buySubmit(Math.round(formData.quantity * 1000000) / 1000000, Math.round(formData.amount * 100) / 100)
    }
    
    return (
      <div>
        <Typography component="h2" variant="h6" color="primary" sx={{ display: "flex", justifyContent: "flex-start" }}>
          Buy Bitcoin
        </Typography>
        <br />

        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2}>
              {/* Text field value changes depending on which option (Qty or Amt) is selected from dropdown */}
              <TextField 
                type="text"
                placeholder="0.00"
                onChange={handleChange}
                name="quantity"
                value={formData.qOrA === "quantity" ? formData.quantity : formData.amount}
                variant="outlined" 
              />

              <FormControl fullWidth>
                <Select
                  name="qOrA"
                  value={formData.qOrA}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="quantity">Quantity (BTC)</MenuItem>
                  <MenuItem value="amount">Amount (CHF)</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* When Quantity is selected from dropdown, corresponding Amount is printed beneath it, and vice versa */}
            {formData.qOrA === "quantity" ? 
            <h3>Amount (CHF):<br/>{Math.round(formData.amount * 100) / 100}</h3> : 
            <h3>Quantity (BTC):<br/>{Math.round(formData.quantity * 1000000) / 1000000} </h3> }

            {/* Buy button is only enabled when value entered and enough cash available */}
            <Button type="submit" variant="contained" disabled={props.cash < formData.amount || formData.quantity === 0 || formData.amount === 0}>
              Buy
            </Button>

            <h4>Cash Available: {Math.round(props.cash * 100) / 100} CHF</h4>
        </form>
      </div>
    )
}