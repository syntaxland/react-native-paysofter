// FundAccountButton.js
import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import CardPayment from "./CardPayment";
import CardPaymentUsd from "./CardPaymentUsd";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import QrPayment from "./QrPayment";
import {formatAmount} from "../FormatAmount";

function FundAccountButton({ 
  amount,
  currency,
  showFundAccountButton,
  setShowFundAccountButton,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-center rounded py-2"
          variant="outline-primary"
          onClick={() => setShowFundAccountButton(true)}
        >
          <span>Pay Now</span>
        </Button>
      </div>

      <Modal
        show={showFundAccountButton}
        onHide={() => setShowFundAccountButton(false)}
      >
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <Modal.Title>Mock Payment (Test)</Modal.Title>
            <div>{userInfo.email}</div>
            <div>
              {formatAmount(amount)
              
              // .toLocaleString(undefined, {
              //   minimumFractionDigits: 2,
              //   maximumFractionDigits: 2,
              // })
              
              }{" "}
              {currency}
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Left column with payment options */}
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                {currency === "USD" && ( 
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() => handlePaymentOptionChange("card")} 
                      className={
                        selectedPaymentOption === "card" ? "active" : ""
                      }
                    >
                      <i className="fas fa-credit-card"></i> Debit Card (USD)
                    </Button>{" "}
                  </div>
                )}

                {currency === "NGN" && (
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() => handlePaymentOptionChange("card")}
                      className={
                        selectedPaymentOption === "card" ? "active" : ""
                      }
                    >
                      <i className="fas fa-credit-card"></i> Debit Card (NGN)
                    </Button>{" "}
                  </div>
                )}

                <div className="py-1">
                  <Button
                    disabled
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("transfer")}
                    className={
                      selectedPaymentOption === "transfer" ? "active" : ""
                    }
                  >
                    <i className="fa fa-exchange"></i> Transfer
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    disabled
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("bank")}
                    className={selectedPaymentOption === "bank" ? "active" : ""}
                  >
                    <i className="fas fa-bank"></i> Bank
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    disabled
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("ussd")}
                    className={selectedPaymentOption === "ussd" ? "active" : ""}
                  >
                    <i className="fa fa-mobile"></i> USSD
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    disabled
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("qr")}
                    className={selectedPaymentOption === "qr" ? "active" : ""}
                  >
                    <i className="fa fa-qrcode"></i> Visa QR
                  </Button>{" "}
                </div>
              </div>
            </Col>
            {/* Right column with selected payment option component */}
            <Col md={9}>
              {/* Conditionally render the selected payment option component */}

              {currency === "NGN" && (
                <div>
                  {selectedPaymentOption === "card" && (
                    <CardPayment
                      amount={amount}
                      currency={currency}
                      userEmail={userInfo.email}
                    />
                  )}
                </div>
              )}

              {currency === "USD" && (
                <div>
                  {selectedPaymentOption === "card" && (
                    <CardPaymentUsd
                      amount={amount}
                      currency={currency}
                      userEmail={userInfo.email}
                    />
                  )}
                </div>
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FundAccountButton;
