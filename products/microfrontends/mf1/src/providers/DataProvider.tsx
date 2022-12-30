import RootStore from '../store/RootStore';
import React, { createContext } from 'react';

export const DataContext = createContext<any>({});

const DataProvider = ({ children }: any) => {
  return (
    <DataContext.Provider value={new RootStore()}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
