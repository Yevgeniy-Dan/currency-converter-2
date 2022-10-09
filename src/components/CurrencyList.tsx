import { useAppSelector } from "../hooks";
import { Container, Row, Col } from "react-bootstrap";

const CurrencyList: React.FC = () => {
  const rates = useAppSelector((state) => state.currencies.ratesByBaseCurrency);
  const base = useAppSelector((state) => state.currencies.base);

  return (
    <Container>
      <Row>
        {Object.entries(rates).map(([currency, rate]) => {
          return (
            <Col xl={4} lg={4} md={6} sm={12} key={currency + rate}>
              <p>
                1 {currency} = {rate} {base}
              </p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CurrencyList;
