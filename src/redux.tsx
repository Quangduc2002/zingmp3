import rootReducer from "./Store/reducers/RootReducer";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore<any, any>(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default reduxConfig;
