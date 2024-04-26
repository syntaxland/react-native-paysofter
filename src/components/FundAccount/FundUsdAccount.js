// FundUsdAccount.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import FundAccountButton from "./FundAccountButton";

const FundUsdAccount = ({ history }) => {
  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, success, error } = fundAccountState;
  const [messsage, setMesssage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0); 
  const [showFundAccountButton, setShowFundAccountButton] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount >= 1) {
      setShowFundAccountButton(true);
    } else {
      setMesssage("Minimum amount is 1 USD.");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container>
      {showFundAccountButton && (
        <FundAccountButton
          amount={amount}
          currency={currency}
          showFundAccountButton={showFundAccountButton}
          setShowFundAccountButton={setShowFundAccountButton}
        />
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="py-3 text-center">Fund USD Account</h2>
          {success && (
            <Message variant="success">Request sent successfully.</Message>
          )}

          {messsage && <Message variant="danger">{messsage}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {/* <option value="NGN">NGN</option> */}
                <option value="USD">USD</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <div className="py-3 text-center">
              <Button className="w-100 rounded" type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FundUsdAccount;
