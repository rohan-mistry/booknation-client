import { Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import List from '../../components/List';

const dummyData = [
  {
    coverPhoto: "https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg",
    title:"The Monk who sold his ferrari",
    description:"This inspiring tale provides a step-by-step approach to living with greater courage, balance, abundance, and joy. A wonderfully crafted fable, The Monk Who Sold His Ferrari tells the extraordinary story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life. On a life-changing odyssey to an ancient culture, he discovers powerful, wise, and practical lessons that teach us to : Develop Joyful Thoughts, Follow Our Life's Mission and Calling, Cultivate Self-Discipline and Act Courageously, Value Time as Our Most Important Commodity, Nourish Our Relationships, and Live Fully, One Day at a Time. ",
    price: 460,
    author: 'Robin Sharma',
    id: 1
  },
  {
    coverPhoto: "https://images-na.ssl-images-amazon.com/images/I/61tMpA6eyVL.jpg",
    title:"Greatness Guide",
    description:"This inspiring tale provides a step-by-step approach to living with greater courage, balance, abundance, and joy. A wonderfully crafted fable, The Monk Who Sold His Ferrari tells the extraordinary story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life. On a life-changing odyssey to an ancient culture, he discovers powerful, wise, and practical lessons that teach us to : Develop Joyful Thoughts, Follow Our Life's Mission and Calling, Cultivate Self-Discipline and Act Courageously, Value Time as Our Most Important Commodity, Nourish Our Relationships, and Live Fully, One Day at a Time. ",
    price: 1260,
    author: 'Robin Sharma',
    id: 2
  }
];

const Home = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search Book"
          />
        </div>
        <List input={inputText}/>
        <Grid container spacing={1}>
          
            {
              dummyData.map(item => <Grid item xs={12} md={4} sm={6}>
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