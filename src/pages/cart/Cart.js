import { Box, Button, Card, Container, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Cart = ({ cart, updateItem, removeItem }) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item md={8} xs={12}>
          <Typography component="div" variant="h5" sx={{p:2}}>
            My Cart {cart.length?`(${cart.length})`:""}
          </Typography>
          <Divider/>
          {
            cart.map(cartItem => <Paper sx={{mt: 2}}>
              <Grid container spacing={2} sx={{mt: 2}}> 
                <Grid item md={4} xs={4}>
                  <div style={{height: 112, width:112}}>
                    <Img src={cartItem.item.coverPhoto} />
                  </div>
                </Grid>
                <Grid item md={8} xs={8}>
                  <Typography variant="h6" gutterBottom component="div">
                    {cartItem.item.title}
                  </Typography>
                  <div>
                    <b>&#8377; {cartItem.item.price}</b>
                  </div>
                </Grid>
                <Grid item container md={12} xs={12}>
                  <Grid item md={4} xs={4}>
                    <IconButton 
                      aria-label="add item"
                      onClick={() => updateItem(cartItem.item.id, 1)}
                    >
                      <AddCircleIcon />
                    </IconButton>
                    <IconButton
                      disabled
                    >
                      {cartItem.quantity}
                    </IconButton>
                    <IconButton 
                      aria-label="decrease item"
                      onClick={() => updateItem(cartItem.item.id, -1)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeItem(cartItem.item.id)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>)
          }
          {
            cart.length == 0?<p align="center">
              No items present in the cart
            </p>: <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, ml: 1 }}
                    size="large"
                  >
                    Checkout
                  </Button>
                </Link>
              </Box>
          }
        </Grid>
        <Grid item md={4} xs={12}>
          
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart