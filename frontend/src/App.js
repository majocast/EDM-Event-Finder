import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    try {
      axios.post('http://localhost:5000/load')
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  if(!data) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
