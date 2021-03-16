import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import ContentTable from './components/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header';


const App = () => {
  const [ userBalance, setUserBalance ] = useState(Number(localStorage.getItem('setBalance'))) 
  const [ balance, setBalance ] = useState(50)
  return (
      <div className='App-content'>
        <Header balance={balance} userBalance={userBalance}/>
        <ContentTable balance={balance} setBalance={setBalance} userBalance={userBalance} setUserBalance={setUserBalance} />
        <Footer />
      </div>
  );
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);