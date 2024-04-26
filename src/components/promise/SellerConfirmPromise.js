// SellerConfirmPromise.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerConfirmPromise } from "../../redux/actions/PromiseActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function SellerConfirmPromise({ promiseId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const sellerConfirmPromiseState = useSelector(
    (state) => state.sellerConfirmPromiseState
  );
  const { success, error, loading } = sellerConfirmPromiseState;

  // const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const promiseData = {
    // password: password,
    promise_id: promiseId,
  };
  console.log("promiseId:", promiseId);

  const handleSellerConfirmPromise = () => {
    dispatch(sellerConfirmPromise(promiseData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {/* <h2 className="mb-4">Seller Confirm Promises</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Promise confirmed successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning text-warning"
              style={{ fontSize: "18px",
              //  color: "yellow" 
            }}
            ></i>{" "}
            Warning! This action will confirm that you have fulfilled the promise condition of this
            buyer. 
          </p>

          <Form>
            {/* <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded mt-2"
              />
            </Form.Group> */}
            <Button
              variant="primary"
              onClick={handleSellerConfirmPromise}
              className="rounded mt-2 text-center w-100" 
            >
              Confirm Promise
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerConfirmPromise;
