import { React, useState } from "react";
import './App.css';
import List from "./components/List"
import TextField from "@mui/material/TextField";
import BookComponent from './components/BookComponent';
// function App() {
//   const [inputText, setInputText] = useState("");
//   let inputHandler = (e) => {a
//     var lowerCase = e.target.value.toLowerCase();
//     setInputText(lowerCase);
//   };
//   return (
//     <div className="main">
//       <h1></h1>
//       <div className="search">
//         <TextField
//           id="outlined-basic"
//           onChange={inputHandler}
//           variant="outlined"
//           fullWidth
//           label="Search Book"
//         />
//       </div>
//       <List input={inputText}/>
      
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      <BookComponent/>
    </div>
  );
}
export default App;
