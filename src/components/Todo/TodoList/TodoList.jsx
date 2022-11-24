// Global
import React from 'react';

// Components
import dayjs from 'dayjs';
import TodoItem from '../TodoItem/TodoItem';

// Styles
import './TodoList.less';

function TodoList() {
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      name: 'Tamerlan',
      description: 'Hello everyone!',
      date: new Date().getTime(),
    },
    {
      id: 2,
      name: 'Zeref',
      description: 'Hello everyone all!',
      date: new Date().getTime(),
    },
    {
      id: 3,
      name: 'Hadji',
      description: 'Hi!',
      date: new Date().getTime(),
    },
  ]);
  const startDate = dayjs().format('YYYY MM-DD HH:mm:ss');
  const endDate = dayjs('2018-08-08 21:12:1').format('YYYY MM-DD HH:mm:ss');
  const [status, setStatus] = React.useState(false);
  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <span className="todo-list__header__title">Todo List!</span>
      </div>
      <button className="create-todo">Create todo!</button>
      <div className="line"></div>
      {todos.length &&
        todos.map((todo) => {
          return (
            <TodoItem
              name={todo.name}
              description={todo.description}
              date={todo.date}
              id={todo.id}
              key={todo.id}
            />
          );
        })}
    </div>
  );
}

export default TodoList;
