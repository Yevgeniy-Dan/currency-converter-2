import CurrencyHeader from "../components/CurrencyHeader";
import CurrecncyList from "../components/CurrencyList";

const CurrecncyListPage: React.FC<
  React.PropsWithChildren<{ rates: { [key: string]: number } }>
> = ({ rates }) => {
  return (
    <>
      <CurrencyHeader rates={rates} />
      <CurrecncyList />
    </>
  );
};

export default CurrecncyListPage;
