import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ProductCard = ({item}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea >
            <CardMedia
                component="img"
                height="196"
                image={item.coverPhoto}
            />
            <CardContent>
                <Typography data-testid="product_name" gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography data-testid="product_price" variant="body2" color="text.secondary">
                    &#8377; {item.price}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default ProductCard