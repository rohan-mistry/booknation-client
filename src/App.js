import React,{ useState, useEffect} from 'react';
import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import AdminDashboard from './pages/admin/home/AdminDashboard';
import RequireAuthAdmin from './components/auth/RequireAuthAdmin';
import Loader from './components/Loader';
import RequireAuth from './components/auth/RequireAuth';

let AuthContext = React.createContext();

function AuthProvider({ children, setIsLoading }) {
  let [user, setUser] = React.useState(null);

  let signin = async(data, callback) => {
    const response = await axios.post('/api/auth/signin', data, {headers: header});
    setUser({
      username: response.data.username,
      email: response.data.email,
      roles: response.data.roles
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
      const result = await response.data;
      setUser(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      if(error.response && error.response.data){
        console.log(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    //check if token is present
    if(localStorage.getItem('token')) {
      //fetch user detail from this token;
      fetchUserDetail();
    } else {
      setIsLoading(false);
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
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const addItem = (item) => {
    let itemExists = cart.some(elem => elem.item.id === item.id);
    if(itemExists) {
      return;
    }
    let items = [...cart,{item,quantity: 1}];
    setCart(items);
    let cartString = JSON.stringify(items);
    localStorage.setItem('cart',cartString);
  }

  const updateItem = (itemID, quantity) => {
    let cartCopy = [...cart]

    let existentItem = cartCopy.find(elem => elem.item.id === itemID);
    
    if (!existentItem) return
    
    existentItem.quantity += quantity;

    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter(elem => elem.item.id !== itemID)
    }
    
    setCart(cartCopy);
    
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const removeItem = (itemID) => {
    let items = [...cart]
  
    items = items.filter(elem => elem.item.id !== itemID);
    
    setCart(items);
    
    let cartString = JSON.stringify(items)
    localStorage.setItem('cart', cartString)
  }

  const checkItem = (itemID) => {
    let itemExists = cart.some(elem => elem.item.id === itemID);
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
      <AuthProvider setIsLoading={setIsLoading}>
        {isLoading ? <Loader open={isLoading} />:
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
              {/* Admin Route */}
              <Route 
                path="/admin" 
                element={
                  <RequireAuthAdmin>
                    <AdminDashboard/>
                  </RequireAuthAdmin>
                }
              />
              <Route path="*" element={<Error/>}/>
            </Route>
          </Routes>
        </Router>}
      </AuthProvider>
    </div>
  );
}

export default App;
