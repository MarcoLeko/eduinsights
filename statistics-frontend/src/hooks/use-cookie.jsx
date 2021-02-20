import { useState } from "react";
import Cookies from "js-cookie";

const useCookie = (key, options = {}) => {
  const [item, setItemValue] = useState(() => {
    if (Cookies.get(key)) {
      return Cookies.get(key);
    }
    return null;
  });

  const setValue = (value, options) => {
    setItemValue(value);
    Cookies.set(key, value, options);
  };

  const removeItem = (options) => {
    Cookies.remove(key);
  };

  return [item, setValue, removeItem];
};

export default useCookie;
