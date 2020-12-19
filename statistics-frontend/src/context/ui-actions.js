import { CAN_SWIPE, THEME } from "./ui-action-types";

export const setSwipe = (canSwipe) => ({ type: CAN_SWIPE, canSwipe });
export const setTheme = (theme) => ({ type: THEME, theme });
