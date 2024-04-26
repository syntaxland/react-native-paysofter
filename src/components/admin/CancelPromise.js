// CancelPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelPromise } from "../../redux/actions/PromiseActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function CancelPromise({ promiseId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cancelPromiseState = useSelector((state) => state.cancelPromiseState);
  const { success, error, loading } = cancelPromiseState;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history, error]);

  const promiseData = {
    promise_id: promiseId,
    password: password,
  };

  console.log("promiseData:", promiseData);

  const handleActivateFundAccount = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    dispatch(cancelPromise(promiseData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {/* <h2 className="mb-4">Toggle Account Fund</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              Promise cancelled successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will cancel the promise order. Enter password
            for your account email <strong>{userInfo.email}</strong>:{" "}
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
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleActivateFundAccount}
              className="rounded mt-2 text-center w-100"
              disabled={loading || success}
            >
              Cancel Promise
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CancelPromise;
