import { useState, useEffect } from "react";
import api, { errHandler } from "../api";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController()

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const res = await api.get(url, {
          signal: controller.signal
        });

        if (isMounted) {
          setData(res.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          errHandler(err)
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    // cleanUp
    return () => {
      isMounted = false;
      controller.abort("Component was nmounted")
    };
  }, [dataUrl]);

  return { data, setData, fetchError, isLoading };
};

export default useAxiosFetch;