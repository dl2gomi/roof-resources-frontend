import { useState } from 'react';
import axios from 'axios';

export const useApiRequest = ({
  endpoint,
  method = 'GET',
  data = null,
  params = null,
  headers = { 'Content-Type': 'application/json' },
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (dynData = {}, dynParams = {}, extraEndpoint = '') => {
    setLoading(true);
    setError(null);

    const config = {
      url: endpoint + extraEndpoint,
      method,
      headers: {
        ...headers,
        accept: 'application/json',
      },
      data: {
        ...data,
        ...dynData,
      },
      params: {
        ...params,
        ...dynParams,
      },
    };

    try {
      const res = await axios(config);
      setResponse(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data ?? err);
      } else {
        setError({ message: err?.response?.statusText ?? 'Something went wrong!' });
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};
