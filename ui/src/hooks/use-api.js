import useSWR from 'swr';

import http from '../transports/http';

const fetcher = (url) => http.get(url);

const useAPI = (path) => {
  const { data, error, mutate } = useSWR(path, fetcher);
  const isEmpty = data && data.length === 0;

  return {
    data,
    isLoading: !error && !data,
    isEmpty,
    error,
    mutate
  };
};

export default useAPI;
