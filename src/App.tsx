import React from 'react';
import Navbar from './components/layout/NavBar';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import "./App.css"
import "./index.css"
const App = () => {
  return (
    <div >
      <Navbar />
      <Main />
      <Footer/>
    </div>
  );
};

export default App;
