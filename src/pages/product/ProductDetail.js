import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom';

const ProductDetail = ({addCartItem,checkItem}) => {

  let location = useLocation();
  const { item } = location.state;
  const [addToCartOption, setAddToCartOption] = useState(true);

  const params = useParams();

  const handleAddItem = () => {
    addCartItem(item);
    setAddToCartOption(false);
  }

  useEffect(() => {
    console.log(params.bookID);
    if(checkItem(Number(params.bookID))) {
      setAddToCartOption(false);
    }
    
  }, [])
  
  return (
    <Container maxWidth="lg" sx={{marginTop:10}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={item.coverPhoto} style={{maxHeight: 370}} width="200"/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom component="div">
            {item.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            by {item.author}
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            &#8377; {item.price}
          </Typography>
          <div style={{marginBottom: 10}}>
            {
              addToCartOption?<Button
                color="primary"
                variant='contained'
                onClick={() => handleAddItem()}
              >
                Add to cart
              </Button>:<Button
                color="secondary"
                variant='contained'
                href="/cart"
              >
                Go to cart
              </Button>
            }
          </div>
          <Typography variant="body1" gutterBottom>
            {item.description} 
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail