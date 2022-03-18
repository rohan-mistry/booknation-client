import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const OrderSucces = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
          <Link to="/">
            <Button 
              variant="outlined"
              color="primary"
              fullWidth
              sx={{mt: 1}}
            >
              Go to Home
            </Button>
          </Link>
        </React.Fragment>
      </Paper>
    </Container>
    
  )
}

export default OrderSucces