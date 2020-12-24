import React, { createContext, useEffect, useReducer, useState } from "react";
import { THEME } from "./ui-action-types";
import { setTheme } from "./ui-actions";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    default:
      return state;
  }
}

const UiContext = createContext(initialState);

function UiContextProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const [mediaQueryThemeMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)")
  );

  function setMapModeWrapper(e) {
    dispatch(setTheme(e.matches ? "dark" : "light"));
  }

  useEffect(() => {
    mediaQueryThemeMode.addEventListener("change", setMapModeWrapper);

    return () =>
      mediaQueryThemeMode.removeEventListener("change", setMapModeWrapper);
  }, [mediaQueryThemeMode]);

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
}

export { UiContext, UiContextProvider };
