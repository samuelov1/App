import { createStore } from "redux";
import reducer from "./reducer";

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);
