// Global
import React from 'react';
import dayjs from 'dayjs';

// Styles
import './TodoItem.less';

function TodoItem({
  name,
  description,
  date,
  todoKey,
  deleteTodo,
  currentDate,
}) {
  const dateFormat = dayjs(date).format('YY/MM/DD HH:mm:ss');
  return (
    <div className="todo-item">
      <div className="todo-info">
        <p className="todo-info__name">Name: {name}</p>
        <p className="todo-info__decription">Decription: {description}</p>
        <p className="todo-info__status">Status: {currentDate}</p>
      </div>
      <div className="todo-other-info">
        <button className="todo-delete" onClick={() => deleteTodo(todoKey)}>
          Delete
        </button>
        <button className="todo-change">Change Todo</button>
        {dateFormat && <p>End Date: {dateFormat}</p>}
      </div>
    </div>
  );
}
export default TodoItem;
