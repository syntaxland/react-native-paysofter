// BuyerPromiseMsgInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  clearBuyerMessageCounter,
  getBuyerPromises,
} from "../../redux/actions/PromiseActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import Pagination from "../Pagination";

const BuyerPromiseMsgInbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo, history]);

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { loading, promises, error } = getBuyerPromiseState;
  console.log("Promises:", promises);

  const buyerMsgCounted = promises?.reduce(
    (total, userMessages) => total + userMessages.buyer_msg_count,
    0
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promises?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const clearMessageCounter = (promiseId) => {
    const promiseMessageData = {
      promise_id: promiseId,
    };
    dispatch(clearBuyerMessageCounter(promiseMessageData));
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getBuyerPromises());
  }, [dispatch]);

  return (
    <Container>
      {currentItems?.length > 0 && (
        <Row>
          <Col>
            <h2 className="text-center py-3">
              <hr />
              <i className="fa fa-message"></i> Buyer Inbox{" "}
              {buyerMsgCounted > 0 && (
                <>
                  (<span className="msg-counter">{buyerMsgCounted}</span>)
                </>
              )}
              <hr />
            </h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? (
              <Loader />
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <div className="text-center py-3">
                    Buyer promise inbox messages appear here.
                  </div>
                ) : (
                  <Card className="py-3">
                    <Card.Body>
                      <ListGroup>
                        {currentItems?.map((message) => (
                          <ListGroup.Item
                            key={message.id}
                            className={`message-list-item ${
                              !message?.is_read ? "unread-message" : ""
                            }`}
                          >
                            <Card.Title>{message?.subject}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {/* Buyer:{" "} */}
                              <i className="fas fa-user"></i>{" "}
                              {message?.seller_username} | {message.promise_id}
                            </Card.Subtitle>

                            <Card.Text
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  expandedMessages.includes(message.id)
                                    ? message.message
                                    : message?.message?.split(" ")?.length > 10
                                    ? message.message
                                        .split(" ")
                                        ?.slice(0, 10)
                                        .join(" ") + " ..."
                                    : message.message
                                ),
                              }}
                            />

                            {message?.message?.split(" ")?.length > 10 &&
                              !expandedMessages?.includes(message.id) && (
                                <>
                                  <Button
                                    variant="link"
                                    onClick={() => {
                                      expandMessage(message.id);
                                    }}
                                  >
                                    {" "}
                                    Read More
                                  </Button>
                                </>
                              )}
                            <div className="d-flex justify-content-between text-muted">
                              <small>
                                {new Date(message?.modified_at).toLocaleString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </small>

                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                  clearMessageCounter(message.promise_id)
                                }
                              >
                                <Link
                                  to={`/buyer/promise/message/${message.promise_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Message Seller{" "}
                                  {message?.buyer_msg_count > 0 && (
                                    <span className="msg-counter">
                                      {message?.buyer_msg_count}
                                    </span>
                                  )}
                                </Link>
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={promises?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BuyerPromiseMsgInbox;
