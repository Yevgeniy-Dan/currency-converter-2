import { useAppSelector } from "../hooks";

const CurrencyList: React.FC = () => {
  const base = useAppSelector((state) => state.currencies.base);
  const rates = useAppSelector((state) => state.currencies.ratesByBaseCurrency);
  return (
    <>
      {Object.entries(rates).map(([currency, rate]) => {
        return (
          <div key={currency + rate}>
            <p>
              1 {currency} = {rate} {base}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default CurrencyList;
