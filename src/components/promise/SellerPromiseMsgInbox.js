// SellerPromiseMsgInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  clearSellerMessageCounter,
  getSellerPromises,
} from "../../redux/actions/PromiseActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import Pagination from "../Pagination";

const SellerPromiseMsgInbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo, history]);

  const getSellerPromiseState = useSelector(
    (state) => state.getSellerPromiseState
  );
  const { loading, promises, error } = getSellerPromiseState;
  console.log("Promises:", promises);

  const sellerMsgCounted = promises?.reduce(
    (total, userMessages) => total + userMessages.seller_msg_count,
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
    dispatch(clearSellerMessageCounter(promiseMessageData));
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getSellerPromises());
  }, [dispatch]);

  return (
    <Container>
      {currentItems?.length > 0 && profile.is_seller && (
        <Row>
          <Col>
            <h2 className="text-center py-3">
              <hr />
              <i className="fa fa-message"></i> Seller Inbox{" "}
              {sellerMsgCounted > 0 && (
                <>
                  (<span className="msg-counter">{sellerMsgCounted}</span>)
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
                    Seller promise inbox messages appear here.
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
                              {message?.buyer_username} | {message.promise_id}
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
                                  to={`/seller/promise/message/${message.promise_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Message Buyer{" "}
                                  {message?.seller_msg_count > 0 && (
                                    <span className="msg-counter">
                                      {message?.seller_msg_count}
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

export default SellerPromiseMsgInbox;
