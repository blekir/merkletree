import { useState, useEffect } from 'react';

import Account from './utils/account';
import DappContext from "./context";



import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Mint from './components/Mint';

function App() {
  const {state, authenticate, logout} = Account();
  const {account, isLoading, isAuthenticated, isError} = state;
  
  
  return (
    <DappContext.Provider  value={{account, 
                                  isLoading, 
                                  isAuthenticated, 
                                  authenticate, 
                                  logout,
                                  }}>
      <div className="app flex column centered">
        <Mint />
      </div>
    </DappContext.Provider>
  );
}

export default App;
