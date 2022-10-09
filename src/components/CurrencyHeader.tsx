import { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { currenciesActions } from "../store/currency-slice";
import { Link } from "react-router-dom";

import { Container, Form } from "react-bootstrap";
import classes from "../modules/css/App.module.css";

const CurrencyHeader: React.FC = () => {
  const rates = useAppSelector((state) => state.currencies.rates);
  const dispatch = useAppDispatch();
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
    <Container className="d-flex flex-column justify-content-center">
      <h1 className="text-center">Currency List</h1>
      <div className={`${classes.mainContainer}`}>
        <div className=" d-flex flex-row align-items-center">
          <Form.Label htmlFor="currencySelect">Choose base currency</Form.Label>
          <Form.Select
            id="currencySelect"
            ref={currencySelectRef}
            value={selectValue}
            onChange={changeCurrencyHandle}
          >
            {currencies.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Form.Select>
        </div>
        <div className={classes.prevPageBtnContainer}>
          <Link to="/converter" state={{}}>
            Previous Page
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CurrencyHeader;
