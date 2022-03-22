import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { header, tokenHeader } from '../../../config';

const initialBookDetail = {
  name: "",
  author: "",
  price: 0,
  coverPhoto:"",
  description: ""
};

const AdminDashboard = () => {
  const [bookDetail, setBookDetail] = useState(initialBookDetail);

  const handleCreateBook = async() => {
    try {
      const response = await axios.post('/api/admin/book/create',bookDetail,{headers: {...header,...tokenHeader}});
      if(response.status === 200) {
        alert("Book created successfully!");
        setBookDetail(initialBookDetail);
      }
    } catch (error) {
      console.log(error.response);
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
    }
  }
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Create Book
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Book name"
              value={bookDetail.name}
              onChange={(e) => setBookDetail({...bookDetail, name: e.target.value})}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="author"
              name="author"
              label="Author Name"
              value={bookDetail.author}
              onChange={(e) => setBookDetail({...bookDetail, author: e.target.value})}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="coverPhoto"
              name="coverPhoto"
              label="Cover Photo"
              value={bookDetail.coverPhoto}
              onChange={(e) => setBookDetail({...bookDetail, coverPhoto: e.target.value})}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="price"
              type="number"
              inputProps={{
                min: 0
              }}
              name="price"
              label="Price"
              value={bookDetail.price}
              onChange={(e) => setBookDetail({...bookDetail, price: e.target.value})}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              multiline
              id="description"
              rows={4}
              inputProps={{
                maxLength: 255
              }}
              name="description"
              label="Description"
              fullWidth
              value={bookDetail.description}
              onChange={(e) => setBookDetail({...bookDetail, description: e.target.value})}
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 3, ml: 1 }}
            size="large"
            onClick={() => handleCreateBook()}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AdminDashboard