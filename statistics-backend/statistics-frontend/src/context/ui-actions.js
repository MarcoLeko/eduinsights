import {
  ACTIVE_TAB,
  SIDEBAR,
  THEME,
  VISUALIZATION_LOADED,
} from "./ui-action-types";

export const setTheme = (theme) => ({ type: THEME, theme });
export const setActiveTab = (activeTab) => ({ type: ACTIVE_TAB, activeTab });
export const setVisualizationLoaded = (visualizationLoaded) => ({
  type: VISUALIZATION_LOADED,
  visualizationLoaded,
});
export const setSidebarOpen = (sidebarOpen) => ({ type: SIDEBAR, sidebarOpen });
