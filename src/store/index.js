import userStore from "./user";
import conditionStore from "./conditions";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    userStore,
    conditionStore,
  },
});

export default store;