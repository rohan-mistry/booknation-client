import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetail = ({addCartItem,checkItem}) => {

  let location = useLocation();

  const [addToCartOption, setAddToCartOption] = useState(true);

  const params = useParams();
  const [item, setitem] = useState({})
  const handleAddItem = () => {
    addCartItem(item);
    setAddToCartOption(false);
  }
  const fetchBookById = async() => {
    try {
      const response = await axios.get('/api/book/getBookById/'+params.bookID);
      console.log(response.data);
      const result = response.data;
      setitem(response.data);
      if(checkItem(Number(params.bookID))) {
        setAddToCartOption(false);
      }
    } catch (error) {
      console.log(error.response);
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
    }
  }
  useEffect(() => {
    fetchBookById();
  }, [])
  
  return (
    <Container maxWidth="lg" sx={{marginTop:10}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={item.coverPhoto} style={{maxHeight: 370}} width="200"/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom component="div">
            {item.name}
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
              </Button>:<Link to="/cart">
                <Button
                  color="secondary"
                  variant='contained'
                >
                  Go to cart
                </Button>
              </Link>
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