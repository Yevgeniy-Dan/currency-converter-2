import { configureStore } from "@reduxjs/toolkit";

import currenciesSlice from "./currency-slice";

const store = configureStore({
  reducer: { currencies: currenciesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
