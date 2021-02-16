import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  ACTIVE_TAB,
  RECENT_QUERIES,
  SIDEBAR,
  THEME,
  VISUALIZATION_LOADED,
} from "./ui-action-types";
import { getLocalStorageItem, setTheme } from "./ui-actions";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  sidebarOpen: false,
  activeTab: 0,
  visualizationLoaded: false,
  recentQueries: getLocalStorageItem(),
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
    case VISUALIZATION_LOADED: {
      return {
        ...state,
        visualizationLoaded: action.visualizationLoaded,
      };
    }
    case RECENT_QUERIES: {
      return {
        ...state,
        recentQueries: action.recentQueries,
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
    <UiContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
}

export { UiContext, UiContextProvider };
