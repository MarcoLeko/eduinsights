import {CAN_SWIPE} from "./action-types";

export const setSwipeState = canSwipe => ({ type: CAN_SWIPE, payload: { canSwipe } });
