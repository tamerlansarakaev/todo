// Global
import React from 'react';

// Styles
import './App.less';
import TodoList from './components/Todo/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <div className="todos">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
