import React, { createContext, useEffect, useReducer, useState } from "react";
import { THEME, SIDEBAR, ACTIVE_TAB } from "./ui-action-types";
import { setTheme } from "./ui-actions";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  sidebarOpen: false,
  activeTab: 0,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR: {
      return {
        ...state,
        sidebarOpen: action.sidebarOpen,
      };
    }
    case THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.activeTab,
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
