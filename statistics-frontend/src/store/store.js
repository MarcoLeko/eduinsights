import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import alertReducer from "./alert/alert-reducer";
import thunk from "redux-thunk";

const loggerMiddleware = createLogger();
const rootReducer = combineReducers({ alertReducer });

export default () =>
  createStore(
    rootReducer,
    applyMiddleware(
      ...[
        thunk,
        process.env.NODE_ENV === "development" && loggerMiddleware,
      ].filter(Boolean)
    )
  );
