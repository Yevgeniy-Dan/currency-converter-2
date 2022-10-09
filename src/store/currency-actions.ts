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

      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/latest?&base=${base}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Could  not fetch currency data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const currencyData = await fetchData();
      dispatch(
        currenciesActions.replaceCurrencies({
          rates: currencyData.rates,
        })
      );
      dispatch(
        currenciesActions.baseChange({
          base,
        })
      );
    } catch (error) {
      dispatch(
        currenciesActions.showUpdateNotification({
          success: false,
          error: true,
        })
      );
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
          converterActions.setConvertStatus({
            status: "failed",
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
        converterActions.setConvertStatus({
          status: "failed",
          message: "Server problems. Can't get currency data",
        })
      );
    }
  };
};
