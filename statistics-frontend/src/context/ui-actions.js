import { ACTIVE_TAB, SIDEBAR, THEME } from "./ui-action-types";

export const setTheme = (theme) => ({ type: THEME, theme });
export const setActiveTab = (activeTab) => ({ type: ACTIVE_TAB, activeTab });
export const setSidebarOpen = (sidebarOpen) => ({ type: SIDEBAR, sidebarOpen });
