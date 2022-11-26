// Global
import React from 'react';

// Components
import TodoItem from '../TodoItem/TodoItem';
import Form from '../../UI/Form/Form';
import {
  deleteItemsAPI,
  getApiItems,
  postAPI,
  API_URL,
  updateItemsApi,
} from '../../api';

// Styles
import './TodoList.less';
import { postFormData } from '../../postFormData';

function TodoList() {
  const currentDateMillisecond = new Date().getTime();
  const [status, setStatus] = React.useState(null);
  const [todos, setTodos] = React.useState();
  const [fileUpload, setFileUpload] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    endDate: '',
    filePath: '',
    fileName: '',
  });

  async function handleSubmit(formData) {
    const { name, description, endDate } = formData;
    const dataIsFine = name && description && endDate;

    if (dataIsFine) {
      if (fileUpload) {
        const fileInfo = await postFormData(fileUpload);

        if (fileInfo) {
          formData.filePath = fileInfo.filePath;
          formData.fileName = fileInfo.fileName;

          postAPI(formData, 'todos.json').then(() => {
            getApiItems(API_URL, (items) => setTodos(items), '/todos.json');
          });
        }
      } else {
        postAPI(formData, 'todos.json').then(() => {
          getApiItems(API_URL, (items) => setTodos(items), '/todos.json');
        });
      }
      clearForm();
    }
  }

  function clearForm() {
    setStatus(false);
    setFileUpload(null);
    return setFormData({
      name: '',
      description: '',
      endDate: '',
      filePath: '',
      fileName: '',
    });
  }

  React.useEffect(() => {
    getApiItems(API_URL, (items) => setTodos(items), '/todos.json');
  }, []);

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h1 className="todo-list__header__title">Todo List!</h1>
      </div>
      <button
        className="create-todo"
        onClick={() => {
          setStatus(!status);
        }}
      >
        Create todo!
      </button>
      {status && (
        <Form title="Create Todo!">
          <p className="input-title">Your Name:</p>
          <input
            type="text"
            required
            className="name-input"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <p className="input-title">Your Description:</p>
          <input
            required
            type="text"
            className="description-input"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <p className="input-title">Your End Date:</p>
          <input
            type="datetime-local"
            className="date-input"
            required
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                endDate: e.target.value,
              }))
            }
          />
          <p className="input-title">Your File:</p>
          <input
            type="file"
            className="name-input"
            onChange={(event) => setFileUpload(event.target.files[0])}
          />
          <button
            className="todo-list__create-button"
            onClick={() => {
              handleSubmit(formData);
            }}
          >
            Post
          </button>
        </Form>
      )}
      <div className="line"></div>
      {todos && todos.length ? (
        todos.map((todo, i) => {
          return (
            <TodoItem
              name={todo.name}
              description={todo.description}
              date={todo.endDate}
              file={{
                name: todo.fileName,
                url: todo.filePath,
              }}
              onChangeTodo={(item) => {
                updateItemsApi(todo.id, `${API_URL}/todos`, item).then(() => {
                  getApiItems(
                    API_URL,
                    (todo) => setTodos(todo),
                    './todos.json'
                  );
                });
              }}
              currentDateMillisecond={currentDateMillisecond}
              onDelete={() =>
                deleteItemsAPI(todo.id, `${API_URL}/todos`).then(() => {
                  getApiItems(
                    API_URL,
                    (todo) => setTodos(todo),
                    './todos.json'
                  );
                })
              }
              key={i}
            />
          );
        })
      ) : (
        <span className="no-todos">The list is empty</span>
      )}
    </div>
  );
}

export default TodoList;
