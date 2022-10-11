import axios from 'axios'

const Item = {
  read: () => axios.get('/api/books'),
  create: item => axios.post('/api/books', item),
  update: (id, updates) => axios.put(`/api/books/${id}`, updates),
  delete: id => axios.delete(`/api/books/${id}`)
}

export default Item