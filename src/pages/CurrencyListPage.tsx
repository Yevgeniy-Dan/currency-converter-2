import CurrencyHeader from "../components/CurrencyHeader";
import CurrecncyList from "../components/CurrencyList";
import { Container } from "react-bootstrap";

const CurrecncyListPage: React.FC = () => {
  return (
    <Container className="p-3">
      <CurrencyHeader />
      <CurrecncyList />
    </Container>
  );
};

export default CurrecncyListPage;
