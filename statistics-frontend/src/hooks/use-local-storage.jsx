import { useState } from "react";

const initialValue = [];

function useLocalStorageQueryHistory() {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem("queries");
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem("queries", JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export { useLocalStorageQueryHistory };
