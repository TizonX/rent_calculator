"use client";
import { store } from "./store";
const { Provider } = require("react-redux");
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
