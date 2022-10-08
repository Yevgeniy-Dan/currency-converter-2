import { AppDispatch, RootState } from ".";
import { converterActions } from "./converter-slice";
import { currenciesActions } from "./currency-slice";

export const fetchCurrencyData = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const base = getState().currencies.base;

    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "hwqThij4Hc88oVKczcoH2v1U2BIpoHMx");

      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      // const response = await fetch(
      //   `https://api.apilayer.com/fixer/latest?&base=${base}`,
      //   requestOptions
      // );

      // if (!response.ok) {
      //   throw new Error("Could  not fetch currency data");
      // }

      // const data = await response.json();

      // return data;
    };

    try {
      // const currencyData = await fetchData();
      dispatch(
        currenciesActions.replaceCurrencies({
          // rates: currencyData.rates,
          rates: {
            EUR: 0.813399,
            GBP: 0.72007,
            JPY: 107.346001,
          },
        })
      );
    } catch (error) {
      // Make notification we couldn't get currency data or something like that
    }
  };
};

export const convert = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const isCurrenciesFilled = getState().currencies.isFilled;

    if (isCurrenciesFilled) {
      const actualRates = getState().currencies.rates;

      const amount = getState().converter.amount;

      const baseNameCurrency = getState().converter.baseNameCurrency;
      const convertibleNameCurrency =
        getState().converter.convertibleNameCurrency;

      const baseCurrency = actualRates[baseNameCurrency] || undefined;
      const convertibleCurrency =
        actualRates[convertibleNameCurrency] || undefined;

      if (!baseCurrency || !convertibleCurrency) {
        dispatch(
          converterActions.setConvertError({
            message: "We don't have one or two currencies you entered",
          })
        );
      } else {
        const result = (amount * convertibleCurrency) / baseCurrency;
        dispatch(
          converterActions.convert({ result: Number(result.toFixed(2)) })
        );
      }
    } else {
      dispatch(
        converterActions.setConvertError({
          message: "Server problems. Can't get currency data",
        })
      );
    }
  };
};
