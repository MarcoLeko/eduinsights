import {CAN_SWIPE, IS_LOGGED_IN, TOGGLE_SIDEBAR} from "./action-types";

export const setSwipeState = canSwipe => ({ type: CAN_SWIPE, payload: { canSwipe } });
export const toggleSideBar = isOpen => ({ type: TOGGLE_SIDEBAR, payload: { isOpen } });
export const logIn = isLoggedIn => ({ type: IS_LOGGED_IN, payload: { isLoggedIn } });
