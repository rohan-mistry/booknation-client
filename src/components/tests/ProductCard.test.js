import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

const dummyItemData = {
    coverPhoto: "https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg",
    name: "The Monk who sold his ferrari",
    description: "This inspiring tale provides a step-by-step approach to living with greater courage, balance, abundance, and joy. A wonderfully crafted fable, The Monk Who Sold His Ferrari tells the extraordinary story of Julian Mantle, a lawyer forced to confront the spiritual crisis of his out-of-balance life. On a life-changing odyssey to an ancient culture, he discovers powerful, wise, and practical lessons that teach us to : Develop Joyful Thoughts, Follow Our Life's Mission and Calling, Cultivate Self-Discipline and Act Courageously, Value Time as Our Most Important Commodity, Nourish Our Relationships, and Live Fully, One Day at a Time. ",
    price: 460,
    author: 'Robin Sharma',
    id: 1
};

it("shows name, price, img on the product card", () => {
    render(<ProductCard item={dummyItemData} />);
    expect(screen.getByTestId("product_name")).toHaveTextContent(dummyItemData.name);
    expect(screen.getByTestId("product_price")).toHaveTextContent(`₹ ${dummyItemData.price}`);
    expect(screen.getByRole("img")).toHaveAttribute("src",dummyItemData.coverPhoto);
});
