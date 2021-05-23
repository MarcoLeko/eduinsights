import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  ACTIVE_TAB,
  CAN_SHOW_RECENT_QUERIES,
  IS_SIDEBAR_OPEN,
  IS_VISUALIZATION_LOADED,
  RECENT_QUERIES,
  THEME,
} from "./ui-action-types";
import { getLocalStorageItem, setTheme } from "./ui-actions";
import { detectThemeSchema } from "../helper/user-theme-schema";

const initialState = {
  theme: detectThemeSchema(),
  activeTab: 0,
  recentQueries: getLocalStorageItem(),
  isSidebarOpen: false,
  isVisualizationLoaded: false,
  canShowRecentQueries: true,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarOpen: action.isSidebarOpen,
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
    case IS_VISUALIZATION_LOADED: {
      return {
        ...state,
        isVisualizationLoaded: action.isVisualizationLoaded,
      };
    }
    case RECENT_QUERIES: {
      return {
        ...state,
        recentQueries: action.recentQueries,
      };
    }
    case CAN_SHOW_RECENT_QUERIES: {
      return {
        ...state,
        canShowRecentQueries: action.canShowRecentQueries,
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
