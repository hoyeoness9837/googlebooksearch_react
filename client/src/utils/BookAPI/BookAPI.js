import axios from 'axios';

const BASE_URL = '/api/books';

const BookAPI = {
  read: () => axios.get(BASE_URL),
  search: (title) => axios.get(`${BASE_URL}/${title}`),
  create: (item) => axios.post(BASE_URL, item),
  update: (id, updates) => axios.put(`${BASE_URL}/${id}`, updates),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`),
};

const handleInputChange = (event, state, setState) => {
  const { name, value } = event.target;
  setState({ ...state, [name]: value });
};

export { BookAPI, handleInputChange };
