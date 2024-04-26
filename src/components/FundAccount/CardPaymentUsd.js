// CardPaymentUsd.js
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fundUserUsdAccount } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";
import {formatAmount} from "../FormatAmount";

function CardPaymentUsd({ amount, currency, userEmail }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const fundUsdAccountState = useSelector((state) => state.fundUsdAccountState); 
  const { loading, success, error } = fundUsdAccountState;

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: null,
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  const [isExpirationMonthYearSelected, setIsExpirationMonthYearSelected] =
    useState(false);

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;

    // Detect card type based on the card number prefix
    let detectedCardType = "";
    if (/^4/.test(value)) {
      detectedCardType = "Visa";
    } else if (/^5[1-5]/.test(value)) {
      detectedCardType = "Mastercard";
    }
    setCardType(detectedCardType);
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      isExpirationMonthYearSelected &&
      paymentDetails.cardNumber &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = (e) => {
    e.preventDefault();

    const fundData = {
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,

      card_number: paymentDetails.cardNumber,
      expiration_month_year: paymentDetails.expirationMonthYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(fundUserUsdAccount(fundData));
  };

  useEffect(() => {
    if (success) {
      // dispatch(createPayment(paymentData));
      // dispatch(clearCart());
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        // window.location.href = "/dashboard";
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // console.log('// eslint-disable-next-line')
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <div>
      <h2 className="py-2 text-center">Debit Card ({currency})</h2> 
      {success && (
        <Message variant="success">Payment made successfully.</Message>
      )}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailsChange}
            required
            placeholder="1234 5678 9012 3456"
            maxLength="16"
          />
        </Form.Group>
        {cardType && (
          <p>
            Detected Card Type: {cardType}
            {cardType === "Visa " && <i className="fab fa-cc-visa"></i>}
            {cardType === "Mastercard " && (
              <i className="fab fa-cc-mastercard"></i>
            )}
          </p>
        )}
        <i className="fab fa-cc-mastercard"></i>{" "}
        <i className="fab fa-cc-visa"></i>
        <Form.Group>
          <Form.Label>Expiration Month/Year</Form.Label>
          
          <DatePicker
            selected={paymentDetails.expirationMonthYear}
            onChange={(date) => {
              setPaymentDetails({
                ...paymentDetails,
                expirationMonthYear: date,
              });
              setIsExpirationMonthYearSelected(!!date);
            }}
            dateFormat="MM/yy"
            showMonthYearPicker
            isClearable
            placeholderText="Select month/year"
            className="rounded-select"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handlePaymentDetailsChange}
            required
            maxLength="3"
            placeholder="123"
          />
        </Form.Group>
        <div className="text-center w-100 py-2">
          <Button variant="primary" type="submit" disabled={!isFormValid()}>
            Pay{" "}
            <span>
              (
              {formatAmount(amount)
              
              // .toLocaleString(undefined, {
              //   minimumFractionDigits: 2,
              //   maximumFractionDigits: 2,
              // })
              }{" "}
              {currency})
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CardPaymentUsd;
