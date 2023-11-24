import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url, update) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
        console.log('render');
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  }, [url, update]);
  return { data, loading, error };
};

export default useFetch;
