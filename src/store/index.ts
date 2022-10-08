import { configureStore } from "@reduxjs/toolkit";
import converterSlice from "./converter-slice";

import currenciesSlice from "./currency-slice";

const store = configureStore({
  reducer: {
    currencies: currenciesSlice.reducer,
    converter: converterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
