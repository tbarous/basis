import React from 'react';
import { useContext } from 'react';
import { observer } from 'mobx-react';
import { DataContext } from '../providers/DataProvider';

const Todo = observer(() => {
  const { todoStore } = useContext(DataContext);

  return (
    <div>
      {todoStore.loading ? 1 : 2}
      <button onClick={() => todoStore.load()}>dqwsa</button>
    </div>
  );
});

export default Todo;
