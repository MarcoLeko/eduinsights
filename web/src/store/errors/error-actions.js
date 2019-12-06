import {CLEAR_ERRORS, RECEIVE_ERRORS} from "./errors-action-types";

export const receiveErrors = ({ message }) => ({type: RECEIVE_ERRORS, message});
export const clearErrors = () => ({type: CLEAR_ERRORS});