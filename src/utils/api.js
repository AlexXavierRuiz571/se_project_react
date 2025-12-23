const BASE_URL = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getItems = () => fetch(`${BASE_URL}/items`).then(checkResponse);

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
