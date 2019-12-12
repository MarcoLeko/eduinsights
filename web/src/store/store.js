import {applyMiddleware, combineReducers, createStore} from "redux";
import uiReducer from "./ui/ui-reducer";
import authReducer from "./auth/auth-reducer";
import { createLogger } from 'redux-logger';
import alertReducer from "./alert/alert-reducer";
import thunk from "redux-thunk";

const loggerMiddleware = createLogger();
const rootReducer = combineReducers({uiReducer, authReducer, alertReducer});

export default (preloadedState) => (
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, loggerMiddleware))
);
