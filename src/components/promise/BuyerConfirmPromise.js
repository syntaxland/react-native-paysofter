// BuyerConfirmPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { buyerConfirmPromise } from "../../redux/actions/PromiseActions";
import { createTransaction } from "../../redux/actions/transactionActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
 
function BuyerConfirmPromise({ promiseId, amount }) { 
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const buyerConfirmPromiseState = useSelector(
    (state) => state.buyerConfirmPromiseState
  );
  const { success, error, loading } = buyerConfirmPromiseState;

  // const createTransactionState = useSelector(
  //   (state) => state.createTransactionState
  // );
  // const { success, error, loading } = createTransactionState;

  const [password, setPassword] = useState("");
  const createdAt = new Date().toISOString();  

  const transactionData = {
    payment_id: promiseId,
    amount: amount,
    created_at: createdAt,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(createTransaction(transactionData));
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]); 

  const promiseData = {
    password: password,
    promise_id: promiseId,
  };
  console.log("promiseId:", promiseId);

  const handleBuyerConfirmPromise = () => {
    dispatch(buyerConfirmPromise(promiseData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {/* <h2 className="mb-4">Toggle Account Fund</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Promise confirmed successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning text-warning"
              style={{ fontSize: "18px", 
              // color: "yellow"
             }}
            ></i>{" "}
            Warning! This action will confirm that your promise order from this 
            seller is fulfilled and will transfer the promise amount from your
            account to the seller's. Please enter the password for your account
            email <strong>({userInfo.email}</strong>):{" "}
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded mt-2"
                required
                maxLength={100}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleBuyerConfirmPromise}
              className="rounded mt-2 text-center w-100"
              disabled={password === "" || loading || success}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BuyerConfirmPromise;
