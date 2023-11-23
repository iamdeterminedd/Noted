import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url, update) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        console.log('render');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [url, update]);
  return { data, error };
};

export default useFetch;
