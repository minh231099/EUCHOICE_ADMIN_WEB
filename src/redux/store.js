import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducer";

const logger = createLogger({
  collapsed: true,
  titleFormatter: (action) =>
    `${action.meta && action.meta.prefix} ${action.type}`,
});
const store =
  process.env.NODE_ENV === "development"
    ? createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)))
    : createStore(reducers, applyMiddleware(thunk));

export default store;
