import React from 'react';
import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Home from './pages/Home';
import Flight from './pages/Flight';

const App = () => {
  return (

    <React.Fragment>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flight" element={<Flight />} />
          </Routes>
      </Router>
    </React.Fragment>

  )
};

export default App;
