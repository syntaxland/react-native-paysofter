// SellerBvn.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sellerBvn } from "../../redux/actions/sellerActions";
import Message from "../Message";
import Loader from "../Loader";

function SellerBvn({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const sellerBvnState = useSelector((state) => state.sellerBvnState);
  const { success, error, loading } = sellerBvnState;

  const [bvn, setBvn] = useState("");
  const [bvnError, setBvnError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "bvn":
        setBvn(value);
        setBvnError("");
        break;

      default:
        break;
    }
  };

  const sellerData = {
    bvn: bvn,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/seller/photo");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleSellerBvn = (e) => {
    e.preventDefault(e);

    if (!bvn) {
      setBvnError("Please enter the bank verification number.");
    } else {
      setBvnError("");
    }

    if (!bvn) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setFormError("");
      dispatch(sellerBvn(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Seller Bank Verification Number</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success">Form submitted successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Bank Verification Number</Form.Label>
              <Form.Control
                type="number"
                value={bvn}
                onChange={(e) => handleFieldChange("bvn", e.target.value)}
                placeholder="Enter your bank verification number"
                className="rounded py-2 mb-2"
                maxLength={10}
                required
              />
              <Form.Text className="text-danger">{bvnError}</Form.Text>
            </Form.Group>

            {formError && <Message variant="danger">{formError}</Message>}
          </Form>

          <Button
            variant="primary"
            onClick={handleSellerBvn}
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

export default SellerBvn;
