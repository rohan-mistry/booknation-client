import { React, useState } from "react";
import './App.css';
import List from "./components/List"
import TextField from "@mui/material/TextField";

function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <div className="main">
      <h1></h1>
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
      
    </div>
  );
}

export default App;
