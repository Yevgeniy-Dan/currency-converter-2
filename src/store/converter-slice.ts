import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  amount: number;
  baseCurrency: string;
  convertibleCurrency: string;
  convertStatus: {
    status: string;
    message: string;
  };
};

const initialState: InitialState = {
  amount: 0,
  baseCurrency: "",
  convertibleCurrency: "",
  convertStatus: {
    status: "",
    message: "",
  },
};

const converterSlice = createSlice({
  name: "converter",
  initialState: initialState,
  reducers: {
    convert(state, action: PayloadAction<{ input: string }>) {
      const input = action.payload.input;

      const inputArr = input.trim().split(" ", 4);

      if (inputArr.length < 4) {
        state.convertStatus = { status: "failed", message: "Enter valid text" };
      } else {
        state.amount = parseFloat(inputArr[0].replace(",", "."));
        state.baseCurrency = inputArr[1].toUpperCase();
        state.convertibleCurrency = inputArr[3].toUpperCase();
        state.convertStatus = {
          status: "success",
          message: "Your amount has been converted",
        };
      }
    },
  },
});

export const converterActions = converterSlice.actions;

export default converterSlice;
