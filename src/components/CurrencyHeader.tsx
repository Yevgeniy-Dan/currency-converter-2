import { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { currenciesActions } from "../store/currency-slice";

const CurrencyHeader: React.FC<{ rates: { [key: string]: number } }> = ({
  rates,
}) => {
  const dispatch = useAppDispatch();
  const [ratesByBaseCurrency, setRatesByBaseCurrency] = useState<{
    [key: string]: number;
  }>(rates);
  const base = useAppSelector((state) => state.currencies.base);

  const currencies = Object.keys(rates);
  const currencySelectRef = useRef<HTMLSelectElement>(null);

  const [selectValue, setSelectValue] = useState(base);

  useEffect(() => {
    setSelectValue(base);
  }, [base]);

  const changeCurrencyHandle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    dispatch(
      currenciesActions.baseChange({
        base: currencySelectRef.current!.value,
      })
    );
  };

  return (
    <>
      <h1>Currency List</h1>
      <h3>{base}</h3>
      <select
        ref={currencySelectRef}
        value={selectValue}
        onChange={changeCurrencyHandle}
      >
        {currencies.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </>
  );
};

export default CurrencyHeader;
