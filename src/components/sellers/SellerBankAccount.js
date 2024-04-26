// SellerBankAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sellerBankAccount } from "../../redux/actions/sellerActions";
import Message from "../Message";
import Loader from "../Loader";

function SellerBankAccount({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const sellerBankAccountState = useSelector(
    (state) => state.sellerBankAccountState
  );
  const { success, error, loading } = sellerBankAccountState;

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountNumberError, setBankAccountNumberError] = useState("");

  const [accountName, setBankAccountName] = useState("");
  const [accountNameError, setBankAccountNameError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "bankName":
        setBankName(value);
        setBankNameError("");
        break;

      case "bankAccountNumber":
        setBankAccountNumber(value);
        setBankAccountNumberError("");
        break;

      case "accountName":
        setBankAccountName(value);
        setBankAccountNameError("");
        break;

      default:
        break;
    }
  };

  const sellerData = {
    bank_name: bankName,
    account_name: accountName,
    bank_account_number: bankAccountNumber,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/seller/bvn");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleSellerBankAccount = (e) => {
    e.preventDefault(e);

    if (!bankName) {
      setBankNameError("Please enter the bank name.");
    } else {
      setBankNameError("");
    }

    if (!bankAccountNumber) {
      setBankAccountNumberError("Please enter the account bank number.");
    } else {
      setBankAccountNumberError("");
    }

    if (!accountName) {
      setBankAccountNameError("Please enter the account name.");
    } else {
      setBankAccountNameError("");
    }

    if (!bankName || !bankAccountNumber || !accountName) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setFormError("");
      dispatch(sellerBankAccount(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Seller Bank Account</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success">Form submitted successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Bank Account Name</Form.Label>
              <Form.Control
                type="text"
                value={accountName}
                onChange={(e) =>
                  handleFieldChange("accountName", e.target.value)
                }
                placeholder="Enter account name"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
              <Form.Text className="text-danger">{accountNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Bank Account Number</Form.Label>
              <Form.Control
                type="number"
                value={bankAccountNumber}
                onChange={(e) =>
                  handleFieldChange("bankAccountNumber", e.target.value)
                }
                placeholder="Enter account number"
                className="rounded py-2 mb-2"
                maxLength={10}
                required
              />
              <Form.Text className="text-danger">
                {bankAccountNumberError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                value={bankName}
                onChange={(e) => handleFieldChange("bankName", e.target.value)}
                placeholder="Enter bank name"
                className="rounded py-2 mb-2"
                required
                maxLength={30}
              />
              <Form.Text className="text-danger">{bankNameError}</Form.Text>
            </Form.Group>

            {formError && <Message variant="danger">{formError}</Message>}
          </Form>

          <Button
            variant="primary"
            onClick={handleSellerBankAccount}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={loading || success}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerBankAccount;
