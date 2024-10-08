import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import apiUrl from "../utils/apiUrls";

const useFetchData = <T>(url: string | number, method: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    // const cancelTokenSource = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await axios.request<T>({
          url: `${apiUrl}/${url}`,
          // cancelToken: cancelTokenSource.token,
          //signal: signal,
          method: method,
          data: {},
        });
        setData(response.data);
      } catch (error: any) {
        if (error.name === "CanceledError") {
          // This error is thrown when the request is cancelled
          setError(error);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // return () => controller.abort();
    // return () => cancelTokenSource.cancel();
  }, [url, method]);

  return { data, loading, error };
};

export default useFetchData;
