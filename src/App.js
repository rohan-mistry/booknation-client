import React,{ useState, useEffect} from 'react';
import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import ProductDetail from './pages/product/ProductDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import axios from 'axios';
import { header, tokenHeader } from './config';
import Layout from './components/Layout';
import OrderSucces from './pages/checkout/OrderSucces';

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = async(data, callback) => {
    const response = await axios.post('/api/auth/signin', data, {headers: header});
    console.log(response.data);
    const result = response.data;
    setUser({
      username: response.data.username,
      email: response.data.email
    });
    localStorage.setItem('token', response.data.accessToken);
    callback();
  };

  let signout = (callback) => {
    setUser(null);
    localStorage.removeItem('token');
    callback();
  };

  let value = { user, signin, signout };

  const fetchUserDetail = async() => {
    try {
      const response = await axios.get('/api/user/detail',{headers: tokenHeader});
      console.log(response.data);
      const result = response.data;
      setUser(response.data);
    } catch (error) {
      console.log(error.response);
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    //check if token is present
    if(localStorage.getItem('token')) {
      //fetch user detail from this token;
      fetchUserDetail();
    }
  }, []);
  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();

  if (auth.user) {
    return (
      <p>
        Welcome {auth.user.username}!
      </p>
    );
  } else { return "" };
}

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

  const removeAllItems = () => {
    setCart([]);
  }
  
  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout/>}>
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
              <Route 
                path="/checkout" 
                element={
                  <RequireAuth>
                    <Checkout 
                      cart={cart}
                      removeAllItems={removeAllItems}
                    />
                  </RequireAuth>
                }
              />
              <Route path="/order_successful" element={<OrderSucces/>}/>
              <Route path="*" element={<Error/>}/>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
