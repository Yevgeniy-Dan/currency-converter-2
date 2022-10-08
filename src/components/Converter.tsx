import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { converterActions } from "../store/converter-slice";
import { convert } from "../store/currency-actions";
import classes from "./Converter.module.css";

const Converter: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputError = useAppSelector(
    (state) => state.converter.validationStatus
  );
  const convertError = useAppSelector((state) => state.converter.convertStatus);
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

  return (
    <div className={classes.form}>
      <form onSubmit={convertAmountHandler}>
        <label htmlFor="text">Currency translation text </label>
        <input type="text" id="text" ref={converterTextInputRef} />
        {inputError.status === "failed" && <label>{inputError.message}</label>}
        <button>Result</button>
      </form>
      <div className={classes.resultBox}>
        {convertError.status === "failed" && <p>{convertError.message}</p>}
        <h2>{result}</h2>
      </div>
    </div>
  );
};

export default Converter;
