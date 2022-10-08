import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  rates: { [key: string]: number };
  base: string;
  isFilled: boolean;
};

const initialState: InitialState = {
  rates: {},
  base: "UAH",
  isFilled: false,
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialState,
  reducers: {
    replaceCurrencies(state, action) {
      state.rates = action.payload.rates;
      state.isFilled = true;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;

export default currenciesSlice;
