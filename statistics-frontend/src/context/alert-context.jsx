import React, { createContext, useReducer } from "react";
import { CLEAR, MESSAGE } from "./alert-action-types";

function alertReducer(state = {}, action) {
  switch (action.type) {
    case MESSAGE:
      return {
        message: action.message,
      };
    case CLEAR:
      return {};
    default:
      return state;
  }
}

const AlertContext = createContext({});

function AlertContextProvider({ children }) {
  const [state, dispatch] = useReducer(alertReducer, {});

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertContextProvider };
