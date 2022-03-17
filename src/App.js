import React,{ useState, useEffect} from 'react';
import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/Navbar";
import ProductDetail from './pages/product/ProductDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';


function App() {
  const [cart, setCart] = useState([])
  
  const addItem = (item) => {
    let itemExists = cart.some(elem => elem.item.id==item.id);
    if(itemExists) {
      console.log("item already exists");
      return;
    }
    let items = [...cart,{item,quantity: 1}];
    setCart(items);
    let cartString = JSON.stringify(items);
    localStorage.setItem('cart',cartString);
  }

  const updateItem = (itemID, quantity) => {
    let cartCopy = [...cart]

    let existentItem = cartCopy.find(elem => elem.item.id == itemID);
    
    if (!existentItem) return
    
    existentItem.quantity += quantity;

    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter(elem => elem.item.id != itemID)
    }
    
    setCart(cartCopy);
    
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const removeItem = (itemID) => {
    let items = [...cart]
  
    items = items.filter(elem => elem.item.id != itemID);
    
    setCart(items);
    
    let cartString = JSON.stringify(items)
    localStorage.setItem('cart', cartString)
  }

  const checkItem = (itemID) => {
    let itemExists = cart.some(elem => elem.item.id == itemID);
    return itemExists;
  }
  
  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart)
    console.log("mycart : ", cart)
  }, []);

  return (
    <div className="App">
      <Navbar cartLength={cart.length}/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/book/:bookID" element={<ProductDetail 
            addCartItem={addItem}
            checkItem={checkItem}
          />}/>
          <Route path="/cart" element={<Cart
              cart={cart} 
              updateItem={updateItem}
              removeItem={removeItem}
          />}/>
          <Route path="/checkout" element={<Checkout cart={cart}/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
