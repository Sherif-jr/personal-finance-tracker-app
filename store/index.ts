import { configureStore, Middleware } from "@reduxjs/toolkit";
import reducers from "./slices";
import { persistState } from "./middleware/persist";

const store = configureStore({
  reducer: reducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      persistState as Middleware
    );
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
