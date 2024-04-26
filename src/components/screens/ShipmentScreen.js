// ShipmentScreen.js
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShipment } from "../../actions/orderActions"; 
import Message from "../Message";
import Loader from "../Loader";

const ShipmentScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.shipmentSave);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const order_id = match.params.id;

  //   const location = useLocation();
  //   const { pathname } = location;
  //   const order_id = pathname.split("/shipment/")[1];

  const submitHandler = async (e) => {
    e.preventDefault();

    const shipmentData = {
      address,
      city,
      postalCode,
      country,
      order_id,
    };
    console.log("shipmentData:", shipmentData);

    try {
      // Dispatch saveShipment action to save shipping address
      await dispatch(saveShipment(shipmentData));

      // Redirect to PaymentScreen with the order ID
      history.push(`/payment/${order_id}`);
    } catch (error) {
      console.log("Error saving shipment:", error);
    }
  };

  return (
    <Row>
      <div className="d-flex justify-content-center">
        <Col md={6}>
          <h1 className="text-center py-2">Shipping Address</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center py-2">
              <Button type="submit" className="w-100 rounded" variant="success">
                Proceed to Payment
              </Button>
            </div>
          </Form>
        </Col>
      </div>
    </Row>
  );
};

export default ShipmentScreen;
