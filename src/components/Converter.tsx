import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { converterActions } from "../store/converter-slice";
import { convert, fetchCurrencyData } from "../store/currency-actions";
import classes from "../modules/css/App.module.css";

const Converter: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputError = useAppSelector(
    (state) => state.converter.validationStatus
  );
  const convertStatus = useAppSelector(
    (state) => state.converter.convertStatus
  );
  const result = useAppSelector((state) => state.converter.result);

  useEffect(() => {
    if (inputError.status === "success") {
      dispatch(convert());
    }
  }, [inputError, dispatch]);

  const converterTextInputRef = useRef<HTMLInputElement>(null);

  const convertAmountHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = converterTextInputRef.current!.value;

    dispatch(
      converterActions.validation({
        input: enteredText,
      })
    );
  };

  const updateRateHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(fetchCurrencyData());
  };

  return (
    <div>
      <form onSubmit={convertAmountHandler}>
        <label htmlFor="text">Currency translation text </label>
        <input
          type="text"
          id="text"
          ref={converterTextInputRef}
          placeholder="15 usd in uah"
        />
        {inputError.status === "failed" && (
          <label className={classes.error}>{inputError.message}</label>
        )}
        <div className="d-flex justify-content-between">
          <button>Result</button>
          <button className={classes.updateRateBtn} onClick={updateRateHandler}>
            Update Rate
          </button>
        </div>
      </form>
      <div className={classes.resultBox}>
        {convertStatus.status === "failed" && (
          <p className={classes.error}>{convertStatus.message}</p>
        )}
        {convertStatus.status === "success" && <h2>{result}</h2>}
      </div>
    </div>
  );
};

export default Converter;
