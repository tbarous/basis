import React from 'react';
import DataProvider from '../providers/DataProvider';
import Todo from './Todo';

const App = () => {
  return (
    <DataProvider>
      <Todo />
    </DataProvider>
  );
};

export default App;
