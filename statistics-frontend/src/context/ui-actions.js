import {
  ACTIVE_TAB,
  RECENT_QUERIES,
  IS_SIDEBAR_OPEN,
  THEME,
  IS_VISUALIZATION_LOADED,
  CAN_SHOW_RECENT_QUERIES,
} from "./ui-action-types";

export const setTheme = (theme) => ({ type: THEME, theme });
export const setActiveTab = (activeTab) => ({ type: ACTIVE_TAB, activeTab });
export const setSidebarOpen = (isSidebarOpen) => ({
  type: IS_SIDEBAR_OPEN,
  isSidebarOpen,
});
export const setShowRecentQueries = (canShowRecentQueries) => ({
  type: CAN_SHOW_RECENT_QUERIES,
  canShowRecentQueries,
});
export const setVisualizationLoaded = (isVisualizationLoaded) => ({
  type: IS_VISUALIZATION_LOADED,
  isVisualizationLoaded,
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
  const recentQueries = getLocalStorageItem();
  const fallbackRecentQuery = {
    type: RECENT_QUERIES,
    recentQueries,
  };
  const isNewQueryInRecentQueries = recentQueries.some(
    (query) => query.uri === value.uri
  );
  try {
    if (!isNewQueryInRecentQueries) {
      if (recentQueries.length >= 5) {
        recentQueries.shift();
      }

      window.localStorage.setItem(
        "queries",
        JSON.stringify([...recentQueries, value])
      );
      return {
        type: RECENT_QUERIES,
        recentQueries: [...recentQueries, value],
      };
    }

    return fallbackRecentQuery;
  } catch (error) {
    console.error(error);
    return fallbackRecentQuery;
  }
};
