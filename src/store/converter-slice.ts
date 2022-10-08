import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  amount: number;
  baseNameCurrency: string;
  convertibleNameCurrency: string;
  result: number;
  validationStatus: {
    status: string;
    message: string;
  };
  convertStatus: {
    status: string;
    message: string;
  };
};

const initialState: InitialState = {
  amount: 0,
  baseNameCurrency: "",
  convertibleNameCurrency: "",
  result: 0,
  validationStatus: {
    status: "",
    message: "",
  },
  convertStatus: {
    status: "",
    message: "",
  },
};

const converterSlice = createSlice({
  name: "converter",
  initialState: initialState,
  reducers: {
    validation(state, action: PayloadAction<{ input: string }>) {
      state.convertStatus = {
        status: "",
        message: "",
      };

      state.validationStatus = {
        status: "",
        message: "",
      };

      const input = action.payload.input;

      const inputArr = input.trim().split(" ", 4);

      if (inputArr.length < 4) {
        state.validationStatus = {
          status: "failed",
          message: "Enter valid text",
        };
        state.result = 0;
      } else if (inputArr[1].length !== 3 || inputArr[3].length !== 3) {
        state.validationStatus = {
          status: "failed",
          message:
            "The currency designation consists of three letters. Current currencies can be found on the following page",
        };
        state.result = 0;
      } else {
        state.amount = parseFloat(inputArr[0].replace(",", "."));
        state.baseNameCurrency = inputArr[1].toUpperCase();
        state.convertibleNameCurrency = inputArr[3].toUpperCase();
        state.validationStatus = {
          status: "success",
          message: "Your amount has been converted",
        };
      }
    },
    convert(state, action: PayloadAction<{ result: number }>) {
      state.result = action.payload.result;
      state.convertStatus = {
        status: "",
        message: "",
      };
    },
    setConvertError(state, action: PayloadAction<{ message: string }>) {
      state.convertStatus = {
        status: "failed",
        message: action.payload.message,
      };
    },
  },
});

export const converterActions = converterSlice.actions;

export default converterSlice;
