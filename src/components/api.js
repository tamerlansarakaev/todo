import axios from 'axios';

export const API_URL =
  'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app';

export const postAPI = async (formData, path) => {
  if (formData) {
    return await axios({
      method: 'post',
      url: `${API_URL}/${path}`,
      data: {
        name: formData.name,
        description: formData.description,
        endDate: formData.endDate,
        fileName: formData.fileName || '',
        filePath: formData.filePath || '',
      },
    });
  }
};

export const getApiItems = async (url, items, path) => {
  if (!items) return;
  return await axios
    .get(`${url}/${path}`)
    .then((response) => response.data)
    .then((data) => {
      data &&
        items(
          Object.values(data).map((object, i) => {
            const items = Object.entries(data);
            const id = items[i][0];
            return { ...object, id };
          })
        );
      !data && items([]);
    })
    .catch((err) => console.log(err));
};

export const deleteItemsAPI = async (deleteKey, url) => {
  if (!deleteKey) return;
  await axios.delete(`${url}/${deleteKey}.json`).catch((e) => console.log(e));
};

export const updateItemsApi = async (updateKey, url, updateItem) => {
  if (!updateKey && updateItem) return;
  await axios.patch(`${url}/${updateKey}.json`, updateItem);
};
