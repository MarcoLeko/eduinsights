import { SIDEBAR, THEME } from "./ui-action-types";

export const setTheme = (theme) => ({ type: THEME, theme });
export const setSidebarOpen = (sidebarOpen) => ({ type: SIDEBAR, sidebarOpen });
