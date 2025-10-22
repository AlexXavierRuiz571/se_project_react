const BASE_URL = "http://localhost:3001";

const check = (res) => (res.ok ? res.json() : Promise.reject(res));

export const getItems = () => fetch(`${BASE_URL}/items`).then(check);

export const addItem = ({ name, imageUrl, weather }) =>
  fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(check);

export const deleteItem = (_id) =>
  fetch(`${BASE_URL}/items/${_id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) return Promise.reject(res);
  });
