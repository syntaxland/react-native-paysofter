// MaxWithdrawalSettings.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  setMaxWithdrawal,
  getUserAccountFundBalance,
} from "../../redux/actions/AccountFundActions";
import Loader from "../Loader";
import Message from "../Message";

function MaxWithdrawalSettings({ history }) {
  const dispatch = useDispatch();

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const setMaxFundState = useSelector((state) => state.setMaxFundState);
  const { loading, success, error } = setMaxFundState;

  const [amount, setAmount] = useState(accountFundBalance?.max_withdrawal);

  const submitHandler = (e) => {
    e.preventDefault();

    const amountData = {
      amount: amount,
    };

    dispatch(setMaxWithdrawal(amountData));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  useEffect(() => {
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {/* <h2 className="text-center">Set Maximum Withdrawal Amount</h2> */}
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Maximum withdrawal amount limit of {amount} set successfully.
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                as="select"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value="10000">Less than 10,000 NGN</option>
                <option value="100000">Less than 100,000 NGN</option>
                <option value="500000">Less than 500,000 NGN</option>
                <option value="1000000">Less than 1,000,000 NGN</option>
                <option value="2000000">Less than 2,000,000 NGN</option>
                <option value="3000000">Less than 3,000,000 NGN</option>
                <option value="5000000">Less than 5,000,000 NGN</option>
                <option value="1000000000">More than 10,000,000 NGN</option>
              </Form.Control>
            </Form.Group>

            <div className="py-2">
              <Button
                className="w-100 rounded"
                type="submit"
                variant="primary"
                disabled={loading || success}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default MaxWithdrawalSettings;
