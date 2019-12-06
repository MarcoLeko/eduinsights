import {CLEAR, ERROR} from "./alert-action-types";

export const receiveErrors = ({ message }) => ({type: ERROR, message});
export const clearErrors = () => ({type: CLEAR});