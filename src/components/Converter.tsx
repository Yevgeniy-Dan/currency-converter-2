import React, { useRef } from "react";

import { useAppDispatch } from "../hooks";
import { converterActions } from "../store/converter-slice";
import classes from "./Converter.module.css";

const Converter: React.FC = () => {
  const dispatch = useAppDispatch();

  const converterTextInputRef = useRef<HTMLInputElement>(null);

  const convertAmountHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = converterTextInputRef.current!.value;

    dispatch(
      converterActions.convert({
        input: enteredText,
      })
    );
  };

  return (
    <form className={classes.form} onSubmit={convertAmountHandler}>
      <label htmlFor="text">Currency translation text </label>
      <input type="text" id="text" ref={converterTextInputRef} />
      <label></label>
      <button>Result</button>
    </form>
  );
};

export default Converter;
