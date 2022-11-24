import axios from 'axios';

async function api({
  setTodoItems,
  setTodoKeys,
  setTodos,
  stateInputs,
  apiStatus,
  deleteTodo,
}) {
  const apiURI =
    'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app/todos.json';
  const basicURI =
    'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app/todos';
  const inputs = stateInputs;
  if (apiStatus === 'get') {
    return await axios
      .get(apiURI)
      .then((response) => response.data)
      .then((data) => {
        data && setTodos(Object.values(data));
        data && setTodoKeys(Object.keys(data));
      });
  }

  if (apiStatus === 'post') {
    await axios
      .get(apiURI)
      .then((response) => response.data)
      .then((data) => {
        data && setTodos(Object.values(data));
        data && setTodoKeys(Object.keys(data));
      });
    return await axios({
      method: 'post',
      url: apiURI,
      data: {
        name: inputs.nameInput,
        description: inputs.descriptionInput,
        endDate: inputs.endDate,
      },
    })
      .then(() => {
        axios
          .get(apiURI)
          .then((response) => response.data)
          .then((data) => {
            data && setTodoItems(Object.values(data));
            data && setTodoKeys(Object.keys(data));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (apiStatus === 'delete' && deleteTodo) {
    await axios
      .delete(`${basicURI}/${deleteTodo}.json`)
      .then(() =>
        axios
          .get(apiURI)
          .then((response) => response.data)
          .then((data) => {
            if (data) {
              setTodoItems(Object.values(data));
              setTodoKeys(Object.keys(data));
            }
            if (data === null) {
              return setTodoItems([]);
            }
          })
      )
      .catch((e) => console.log(e));

    return (apiStatus = 'get');
  }
}

export default api;
