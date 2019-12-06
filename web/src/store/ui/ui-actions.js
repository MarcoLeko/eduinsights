import {CAN_SWIPE, TOGGLE_SIDEBAR} from "./ui-action-types";

export const setSwipeState = canSwipe => ({type: CAN_SWIPE, payload: {canSwipe}});
export const toggleSideBar = isOpen => ({type: TOGGLE_SIDEBAR, payload: {isOpen}});
