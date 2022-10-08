import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  rates: {};
  base: string;
};

const initialState: InitialState = {
  rates: {},
  base: "UAH",
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialState,
  reducers: {
    replaceCurrencies(state, action) {
      state.rates = action.payload.rates;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;

export default currenciesSlice;
