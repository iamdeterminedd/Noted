import axios from 'axios';

export default axios.create({
  baseURL: 'https://noted-api-d555.onrender.com',
  // baseURL: 'http://localhost:5000',
});
