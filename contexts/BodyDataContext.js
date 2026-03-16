import React, { createContext, useContext } from 'react';
import { useBodyData } from '../hooks/useBodyData';

const BodyDataContext = createContext(null);

export function BodyDataProvider({ children }) {
  const data = useBodyData();
  return (
    <BodyDataContext.Provider value={data}>
      {children}
    </BodyDataContext.Provider>
  );
}

export function useBodyDataContext() {
  return useContext(BodyDataContext);
}