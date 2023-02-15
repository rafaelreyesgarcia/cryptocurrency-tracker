import React, { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const AppState = () => {
  return useContext(Context);
}

const AppContext = ({children}) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'BTC') setSymbol('₿');
    else if (currency === 'ETH') setSymbol('Ξ');
  },[currency]);
  return (
    <Context.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Context.Provider>
  )
}

export default AppContext;

