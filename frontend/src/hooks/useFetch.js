import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useFetch = (update) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    apiClient
      .get('/notes')
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  }, [update]);
  return { data, loading, error };
};

export default useFetch;
