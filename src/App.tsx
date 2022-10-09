import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchCurrencyData } from "./store/currency-actions";

import { Routes, Route, Navigate } from "react-router-dom";
import ConverterPage from "./pages/ConverterPage";
import CurrecncyList from "./pages/CurrencyListPage";
import RootLayout from "./pages/RootLayout";

function App() {
  const dispatch = useAppDispatch();
  const rates = useAppSelector((state) => state.currencies.rates);

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [dispatch]);

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate replace to="converter" />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route
          path="/currency-list"
          element={<CurrecncyList rates={rates} />}
        />
      </Routes>
    </RootLayout>
  );
}

export default App;
