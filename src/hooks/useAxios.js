import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (options, axiosInstance = axios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({
      ...setState,
      loading: true,
    });
    setTrigger(Date.now());
  };
  // if (!options.url) return;
  useEffect(() => {
    axiosInstance(options)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          error,
        });
      });
  }, [trigger]);
  return { ...state, refetch };
};
