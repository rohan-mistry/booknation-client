import { Container, Grid, IconButton, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

// const dummyData = [
//   {
//     coverPhoto: "https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg",
//     title:"The Monk who sold his ferrari",
//     description:"This inspiring tale provides a step-by-step approach to living with greater courage, balance, abundance, and joy. A wonderfully crafted fable, The Monk Who Sold His Ferrari tells the extraordinary story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life. On a life-changing odyssey to an ancient culture, he discovers powerful, wise, and practical lessons that teach us to : Develop Joyful Thoughts, Follow Our Life's Mission and Calling, Cultivate Self-Discipline and Act Courageously, Value Time as Our Most Important Commodity, Nourish Our Relationships, and Live Fully, One Day at a Time. ",
//     price: 460,
//     author: 'Robin Sharma',
//     id: 1
//   },
//   {
//     coverPhoto: "https://images-na.ssl-images-amazon.com/images/I/61tMpA6eyVL.jpg",
//     title:"Greatness Guide",
//     description:"This inspiring tale provides a step-by-step approach to living with greater courage, balance, abundance, and joy. A wonderfully crafted fable, The Monk Who Sold His Ferrari tells the extraordinary story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life. On a life-changing odyssey to an ancient culture, he discovers powerful, wise, and practical lessons that teach us to : Develop Joyful Thoughts, Follow Our Life's Mission and Calling, Cultivate Self-Discipline and Act Courageously, Value Time as Our Most Important Commodity, Nourish Our Relationships, and Live Fully, One Day at a Time. ",
//     price: 1260,
//     author: 'Robin Sharma',
//     id: 2
//   }
// ];

const Home = () => {
  const [bookName, setBookName] = useState("");
  const [books, setbooks] = useState([])

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setBookName(lowerCase);
  };
  const fetchBooks = async() => {
    try {
      const response = await axios.get('/api/book/getBooks');
      setbooks(response.data);
    } catch (error) {
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
    }
  }
  const searchBook = async() => {
    try {
      const response = await axios.get('/api/book/search',{params:{name:bookName}});
      setbooks(response.data);
    } catch (error) {
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
    }
  }
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <div className="search">
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={()=>searchBook()}
                  edge="end"
                >
                 <SearchIcon/>
                </IconButton>
              </InputAdornment>
              ),
            }}
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            value={bookName}
            label="Search Book"
          />
        </div>
        
        <Grid container spacing={1} sx={{mt:2}}>
          
            {
              books.map(item => <Grid key={item.id} item xs={12} md={4} sm={6}>
                <Link to={"/book/"+item.id} state={{ item }}>
                  <ProductCard item={item}/>
                </Link>
              </Grid>)
            }
            
            
          
        </Grid>
      </Container>
     
    </div>
  )
}

export default Home