import React from 'react';
import Navbar from './components/layout/NavBar';
import Main from './components/layout/Main';
import JobList from './components/layout/JobList';
import Title from 'antd/es/skeleton/Title';
import "./App.css"
const App = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <Main />
      <JobList />
    </div>
  );
};

export default App;
