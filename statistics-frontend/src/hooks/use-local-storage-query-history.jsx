import { useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";

const initialValue = [];

function getLocalStorageItem() {
  const item = window.localStorage.getItem("queries");
  return item ? JSON.parse(item) : initialValue;
}

function useLocalStorageQueryHistory() {
  const { dispatch } = useAlertContext();

  const [recentQueries, setRecentQueries] = useState(() => {
    try {
      return getLocalStorageItem();
    } catch (error) {
      dispatch(receiveMessageInterceptor(error));
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const recentQueries = getLocalStorageItem();
      if (recentQueries.length >= 6) {
        recentQueries.shift();
      }

      if (!recentQueries.some((query) => query.params === value.params)) {
        window.localStorage.setItem(
          "queries",
          JSON.stringify([...recentQueries, value])
        );
        setRecentQueries([...recentQueries, value]);
      }
    } catch (error) {
      dispatch(receiveMessageInterceptor(error));
    }
  };

  return { recentQueries, setValue };
}

export { useLocalStorageQueryHistory };
