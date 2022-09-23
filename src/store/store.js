import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// root-reducer
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleWare = createSagaMiddleware();

// Don't want to pass false to middleware, so we filter and pass an empty array when the env is production
// Thunk is included in the middlewares variable to support thunk operations
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter(Boolean);

// Composer that enables Redux Dev Tools Chrome extension for development purposes. If redux devtools extension doesn't exist, use the normal compose from redux.
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
