// Global
import React from 'react';

// Styles
import './TodoItem.less';

function TodoItem({ name, description, date, id }) {
  return (
    <div className="todo-item">
      <div className="todo-info">
        <p className="todo-info__name">Name: {name}</p>
        <p className="todo-info__decription">Decription: {description}</p>
      </div>
      <div className="todo-other-info">
        <button className="todo-delete">Delete</button>
        <button className="todo-change" onClick={() => console.log(id)}>
          Change Todo
        </button>
        <p>Date: 24/10/10</p>
      </div>
    </div>
  );
}

export default TodoItem;
