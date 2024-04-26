// VerifyAccountFundOtp.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtpDisableAccountFund,
  disableAccountFund,
} from "../../redux/actions/AccountFundActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";

const VerifyAccountFundOtp = ({ formattedEmail }) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const verifyOtpAccountFundState = useSelector(
    (state) => state.verifyOtpAccountFundState
  );
  const { loading, success, error } = verifyOtpAccountFundState;
  console.log("verify formattedEmail:", formattedEmail);

  const sendOtpData = JSON.parse(localStorage.getItem("fundData")) || [];
  console.log("sendOtpData:", sendOtpData, sendOtpData.identifier);

  const otpData = {
    otp: otp,
    identifier: sendOtpData.identifier,
  };

  const resendOtpData = {
    identifier: sendOtpData.identifier,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtpDisableAccountFund(otpData));
  };

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(disableAccountFund(JSON.stringify(resendOtpData)));
      setResendMessage(`OTP resent to ${formattedEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  useEffect(() => {
    if (success) {
      localStorage.removeItem("fundData");
      setShowSuccessMessage(true);
      setTimeout(() => {}, 3000);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col>
          <div className="border rounded p-4">
            <h1>Verify OTP</h1>
            {showSuccessMessage && (
              <Message variant="success">
                Account Fund disabled successfully!
              </Message>
            )}
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {resendMessage && (
              <Message variant={resendLoading ? "info" : "success"}>
                {resendMessage}
              </Message>
            )}
            <Form>
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  maxLength={10}
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={otp === "" || loading || success}
                  variant="success"
                  type="submit"
                  className="rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <p>
              OTP has been sent to your email {formattedEmail} and expires in 10
              minutes. It might take a few seconds to deliver.
            </p>
            <Button
              variant="link"
              type="submit"
              disabled={resendDisabled || resendLoading}
              onClick={handleResendEmailOtp}
            >
              {resendLoading
                ? "Resending OTP..."
                : resendDisabled
                ? `Resend OTP (${countdown}sec)`
                : "Resend OTP"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyAccountFundOtp;
