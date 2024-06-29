// OtpDisableAccountFund.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableAccountFund } from "../../redux/actions/AccountFundActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import VerifyAccountFundOtp from "./VerifyAccountFundOtp"; 

function OtpDisableAccountFund() {
  const dispatch = useDispatch();
  const history = useHistory();

  const disableAccountFundState = useSelector(
    (state) => state.disableAccountFundState
  );
  const { loading, success, formattedEmail, error } = disableAccountFundState;
  console.log("formattedEmail:", formattedEmail);

  const [identifier, setIdentifier] = useState("");
  const [showVerifyAccountFundOtp, setShowVerifyAccountFundOtp] =
    useState(false);
  const [identifierError, setIdentifierError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowVerifyAccountFundOtp(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  const fundData = {
    identifier: identifier,
  };

  const handleDeactivateAccountFund = () => {
    if (!identifier.trim()) {
      setIdentifierError("Email or Account ID is required.");
      return;
    }
    dispatch(disableAccountFund(fundData));
    localStorage.setItem("fundData", JSON.stringify(fundData));
  };

  return (
    <Container>
      {showVerifyAccountFundOtp ? (
        <VerifyAccountFundOtp formattedEmail={formattedEmail} />
      ) : (
        <Row className="justify-content-center mt-3">
          <Col>
            {/* <h2 className="py-3 text-center">OTP Account Fund Deactivation</h2> */}

            {loading && <Loader />}
            {success && (
              <Message variant="success">
                OTP sent to your email: {formattedEmail} successfully.
              </Message>
            )}
            {error && <Message variant="danger">{error}</Message>}

            <p className="rounded text-center">
              <i
                className="fa fa-warning text-warning"
                style={{ fontSize: "18px", 
                // color: "yellow"
               }}
              ></i>{" "}
              Warning! This action will disable all transaction withdrawals from
              your account fund and can only be reactivated by contacting
              Paysofter support.
            </p>

            <Form>
              <Form.Group>
                {/* <Form.Label>Email Address or Account ID</Form.Label> */}
                <Form.Control
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter Email or Account ID"
                  className="rounded mt-2"
                  required
                  maxLength={100}
                />
                <Form.Text className="text-danger">{identifierError}</Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleDeactivateAccountFund}
                className="rounded mt-2 py-2 text-center w-100"
                disabled={identifier === "" || loading || success}
              >
                Deactivate Account Fund
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default OtpDisableAccountFund;
