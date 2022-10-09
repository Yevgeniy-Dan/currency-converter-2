import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchCurrencyData } from "./store/currency-actions";

import { Routes, Route, Navigate } from "react-router-dom";
import ConverterPage from "./pages/ConverterPage";
import CurrecncyList from "./pages/CurrencyListPage";
import RootLayout from "./pages/RootLayout";
import UpdateSuccessAlert from "./components/UpdateAlert";
import { currenciesActions } from "./store/currency-slice";

function App() {
  const dispatch = useAppDispatch();
  const rates = useAppSelector((state) => state.currencies.rates);
  const isSuccess = useAppSelector(
    (state) => state.currencies.updateRate.isUpdated
  );
  const isError = useAppSelector(
    (state) => state.currencies.updateRate.errorUpdating
  );

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      currenciesActions.showUpdateNotification({
        success: true,
        error: false,
      })
    );
    setTimeout(() => {
      dispatch(
        currenciesActions.showUpdateNotification({
          success: false,
          error: false,
        })
      );
    }, 5000);
  }, [rates, dispatch]);

  return (
    <RootLayout>
      <UpdateSuccessAlert isSuccess={isSuccess} isError={isError} />
      <Routes>
        <Route path="/" element={<Navigate replace to="converter" />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/currency-list" element={<CurrecncyList />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
