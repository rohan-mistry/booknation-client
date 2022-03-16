import Protected from "./components/AuthRoutes/Protected";
import SignInRoute from "./components/AuthRoutes/SignInRoute";
import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          {/* <SignInRoute exact path="/signin" component={<Login/>}/> */}
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
