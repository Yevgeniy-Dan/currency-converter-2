import { useEffect } from "react";
import Converter from "./components/Converter";
import { useAppDispatch } from "./hooks";
import { fetchCurrencyData } from "./store/currency-actions";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [dispatch]);

  return (
    <div>
      <Converter />
    </div>
  );
}

export default App;
