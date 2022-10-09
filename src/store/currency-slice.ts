import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  rates: { [key: string]: number };
  ratesByBaseCurrency: { [key: string]: number };
  base: string;
  isFilled: boolean;
  updateRate: {
    isUpdated: boolean;
    errorUpdating: boolean;
  };
};

const initialState: InitialState = {
  rates: {},
  ratesByBaseCurrency: {},
  base: "UAH",
  isFilled: false,
  updateRate: {
    isUpdated: false,
    errorUpdating: false,
  },
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialState,
  reducers: {
    replaceCurrencies(state, action) {
      state.rates = action.payload.rates;
      state.isFilled = true;
    },
    baseChange(state, action: PayloadAction<{ base: string }>) {
      state.base = action.payload.base;

      const newRates: { [key: string]: number } = {};
      Object.entries(state.rates)
        .filter(([currency, _rate]) => {
          return currency !== state.base;
        })
        .forEach(([currency, rate]) => {
          const newRate = (1 * state.rates[state.base]) / rate;
          newRates[currency] = Number(newRate.toFixed(4));
        });

      state.ratesByBaseCurrency = newRates;
    },
    showUpdateNotification(
      state,
      action: PayloadAction<{ success: boolean; error: boolean }>
    ) {
      state.updateRate.isUpdated = action.payload.success;
      state.updateRate.errorUpdating = action.payload.error;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;

export default currenciesSlice;
