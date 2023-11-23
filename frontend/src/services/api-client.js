import axios from 'axios';

export const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:5000/notes');
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
