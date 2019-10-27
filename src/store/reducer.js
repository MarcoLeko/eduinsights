import {CAN_SWIPE} from "./action-types";

const initialState = {
    canSwipe: true
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CAN_SWIPE: {
        return {
            canSwipe: action.payload.canSwipe
        }
        }
        default:
            return state;
    }
}
