import {
  ACTIVE_TAB,
  RECENT_QUERIES,
  SIDEBAR,
  THEME,
  VISUALIZATION_LOADED,
} from "./ui-action-types";

export const setTheme = (theme) => ({ type: THEME, theme });
export const setActiveTab = (activeTab) => ({ type: ACTIVE_TAB, activeTab });
export const setSidebarOpen = (sidebarOpen) => ({ type: SIDEBAR, sidebarOpen });
export const setVisualizationLoaded = (visualizationLoaded) => ({
  type: VISUALIZATION_LOADED,
  visualizationLoaded,
});

export function getLocalStorageItem() {
  const initialValue = [];
  try {
    const item = window.localStorage.getItem("queries");
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
}

export const setRecentQueries = (value) => {
  try {
    const recentQueries = getLocalStorageItem();
    if (recentQueries.length >= 5) {
      recentQueries.shift();
    }

    if (!recentQueries.some((query) => query.uri === value.uri)) {
      window.localStorage.setItem(
        "queries",
        JSON.stringify([...recentQueries, value])
      );
      return {
        type: RECENT_QUERIES,
        recentQueries: [...recentQueries, value],
      };
    }

    return {
      type: RECENT_QUERIES,
      recentQueries,
    };
  } catch (error) {
    console.error(error);
  }
};
