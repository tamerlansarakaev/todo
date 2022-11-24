// Global
import React from 'react';

// Components
import TodoItem from '../TodoItem/TodoItem';
import Form from '../../UI/Form/Form';
import api from '../../api';

// Styles
import './TodoList.less';
import axios from 'axios';

function TodoList() {
  const [status, setStatus] = React.useState(null);
  const [apiStatus, setApiStatus] = React.useState('get');
  const [todos, setTodos] = React.useState();
  const [todoKeys, setTodoKeys] = React.useState();
  const [currentDate] = React.useState('');
  const [fileUpload, setFileUpload] = React.useState(null);
  const [currentKey, setCurrentKey] = React.useState('');
  const [stateInputs, setStateInputs] = React.useState({
    nameInput: '',
    descriptionInput: '',
    endDate: '',
  });
  function saveFormState() {
    if (
      stateInputs.nameInput &&
      stateInputs.descriptionInput &&
      stateInputs.endDate
    ) {
      setApiStatus('post');
      setTimeout(() => {
        setApiStatus('get');
      }, 1000);
    }
  }

  React.useEffect(() => {
    if (apiStatus !== 'get') {
      setApiStatus('get');
    }
    if (apiStatus) {
      api({
        setTodoItems: (todo) => setTodos(todo),
        setTodos: (todos) => setTodos(todos),
        setTodoKeys: (keys) => setTodoKeys(keys),
        stateInputs,
        apiStatus: apiStatus,
        deleteTodo: currentKey,
      });
    }
  }, [apiStatus]);

  React.useEffect(() => {
    if (fileUpload && status === null) {
      const fileToJSON = JSON.stringify(fileUpload);
      axios
        .post('https://todo-e62a9.appspot.com/todofiles', fileToJSON)
        .catch((err) => console.log(err));
    }
  }, [status]);

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h1 className="todo-list__header__title">Todo List!</h1>
      </div>
      <button className="create-todo" onClick={() => setStatus(!status)}>
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
              setStateInputs({ ...stateInputs, nameInput: e.target.value })
            }
          />
          <p className="input-title">Your Description:</p>
          <input
            required
            type="text"
            className="description-input"
            onChange={(e) =>
              setStateInputs({
                ...stateInputs,
                descriptionInput: e.target.value,
              })
            }
          />
          <p className="input-title">Your End Date:</p>
          <input
            type="datetime-local"
            className="date-input"
            required
            onChange={(e) =>
              setStateInputs({ ...stateInputs, endDate: e.target.value })
            }
          />
          <p className="input-title">Your File:</p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="name-input"
            onChange={(event) => setFileUpload(event.target.files)}
          />
          <button
            className="todo-list__create-button"
            onClick={() => {
              saveFormState();
              setStatus(null);
            }}
          >
            Post
          </button>
        </Form>
      )}
      <div className="line"></div>
      {todos ? (
        todos.map((todo, i) => {
          return (
            <TodoItem
              name={todo.name}
              description={todo.description}
              date={todo.endDate}
              deleteTodo={(todo) => {
                setCurrentKey(todo);
                setApiStatus('delete');
              }}
              todoKey={todoKeys[i]}
              currentDate={
                todo.endDate === currentDate
                  ? 'Срок задачи истек!'
                  : 'В процессе'
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

// const myApi = async (method, body) => {
//   const apiURI =
//     'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app/todos.json';

//   const setDataToContext = (data) => {
//     data && setTodos(Object.values(data));
//     data && setTodoKeys(Object.keys(data));
//   };

//   const response = await axios[method](`${apiURI}/${body.path}`)
//     .then(() => {
//       if (method !== 'get') {
//         myApi('get').then((data) => {
//           setDataToContext(data);
//         });
//       }
//     })
//     .catch((e) => console.log(e));

//   return response;
// };

export default TodoList;
