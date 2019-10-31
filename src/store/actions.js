import {CAN_SWIPE, TOGGLE_SIDEBAR} from "./action-types";

export const setSwipeState = canSwipe => ({ type: CAN_SWIPE, payload: { canSwipe } });
export const toggleSideBar = isOpen => ({ type: TOGGLE_SIDEBAR, payload: { isOpen } });
