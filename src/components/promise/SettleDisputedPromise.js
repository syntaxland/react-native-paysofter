// SettleDisputedPromise.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { settleDisputedPromise } from "../../redux/actions/PromiseActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function SettleDisputedPromise({ promiseId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const settleDisputedPromiseState = useSelector(
    (state) => state.settleDisputedPromiseState
  );
  const { success, error, loading } = settleDisputedPromiseState;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  const promiseData = {
    promise_id: promiseId,
    keyword: keyword,
  };
  console.log("promiseId:", promiseId);

  const handleSettleDisputedPromise = () => {
    dispatch(settleDisputedPromise(promiseData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              Conflict resolution activated successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning text-warning"
              style={{ fontSize: "18px",
              //  color: "yellow" 
            }}
            ></i>{" "}
            Warning! This action will open a support ticket for this Promise ID
            to resolve whatever conflict arising from this promise order
            fulfilment. Note that 2% of the promise amount will be charged for
            the service. Type <i>confirm</i> to activate.
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="confirm"
                className="rounded mt-2"
                required
                maxLength={10}
              />
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={handleSettleDisputedPromise}
            className="rounded mt-2 text-center w-100"
            disabled={keyword.toLowerCase() !== "confirm"}
          >
            Activate Resolve Conflict
          </Button>
        </Col> 
      </Row>
    </Container>
  );
}

export default SettleDisputedPromise;
