// PaysofterPromiseSeller.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Modal, Container } from "react-bootstrap";
import {
  getSellerPromises,
  clearSellerMessageCounter,
} from "../../redux/actions/PromiseActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import Timer from "../Timer";
import SellerConfirmPromise from "../promise/SellerConfirmPromise";
import SettleDisputedPromise from "../promise/SettleDisputedPromise"; 
import { formatAmount } from "../FormatAmount";

function PaysofterPromiseSeller({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getSellerPromiseState = useSelector(
    (state) => state.getSellerPromiseState
  );
  const { loading, promises, error } = getSellerPromiseState;
  console.log("Promises:", promises);

  const [showConfirmPromise, setShowConfirmPromise] = useState(false);
  const [selectedPromiseId, setSelectedPromiseId] = useState(null);
  const [selectedPromise, setSelectedPromise] = useState(null);
  const [showSettleDispute, setShowSettleDispute] = useState(false);

  const handleConfirmPromiseOpen = (promiseId) => {
    setSelectedPromiseId(promiseId);
    setShowConfirmPromise(true);
  };

  const handleConfirmPromiseClose = () => {
    setShowConfirmPromise(false);
  };

  const handleSettleDisputeOpen = (promise) => {
    setSelectedPromise(promise);
    setShowSettleDispute(true);
  };

  const handleSettleDisputeClose = () => {
    setShowSettleDispute(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promises?.slice(indexOfFirstItem, indexOfLastItem);

  const formatAccountId = (accountId) => {
    const accountIdStr = String(accountId);

    if (accountIdStr.length < 8) {
      return accountIdStr;
    } else {
      const maskedPart =
        "*".repeat(accountIdStr.length - 4) + accountIdStr.slice(-4);
      return maskedPart;
    }
  };

  const clearMessageCounter = (promiseId) => {
    const promiseMessageData = {
      promise_id: promiseId,
    };
    dispatch(clearSellerMessageCounter(promiseMessageData));
  };

  useEffect(() => {
    dispatch(getSellerPromises());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-money-bill-wave"></i> Promises (Seller)
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">Promises appear here.</div>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm py-2 rounded"
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Promise ID</th>
                      <th>Amount</th>
                      <th>Seller Account ID</th>
                      {/* <th>Seller Email</th> */}
                      <th>Buyer Account ID</th>
                      {/* <th>Buyer Email</th> */}
                      <th>Seller Fulfilled Promise</th>
                      <th>Buyer Promise Fulfilled</th>
                      <th>Status</th>
                      <th>Success</th>
                      <th>Active</th>
                      <th>Expected Settlement Duration</th>
                      <th>Settle Conflict Activated</th>
                      <th>Conflict Settlement Charges</th>
                      <th>Promise Delivered</th>
                      <th>Promise Cancelled</th>
                      <th>Payment Method</th>
                      <th>Payment Provider</th>
                      <th>Promise Made At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((promise, index) => (
                      <tr key={promise.id} className="rounded">
                        <td>{index + 1}</td>
                        <td>
                          {promise.seller_fulfilled_promise ? (
                            <>
                              <Button variant="outline-link" size="sm" disabled>
                                {promise.promise_id}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline-link"
                                size="sm"
                                // onClick={() =>
                                //   handleConfirmPromiseOpen(promise.promise_id)
                                // }
                              >
                                {promise.promise_id}
                              </Button>
                            </>
                          )}
                        </td>
                        <td>
                          {promise.buyer_promise_fulfilled ? (
                            <span style={{ fontSize: "16px", color: "green" }}>
                              {promise.currency}{" "}
                              {
                                formatAmount(promise.amount)

                                // ?.toLocaleString(undefined, {
                                //   minimumFractionDigits: 2,
                                //   maximumFractionDigits: 2,
                                // })
                              }
                            </span>
                          ) : (
                            <>
                              {promise.is_cancelled ? (
                                <>
                                  <span
                                    style={{ fontSize: "16px" }}
                                    className="text-danger"
                                  >
                                    {promise.currency}{" "}
                                    {
                                      formatAmount(promise.amount)

                                      // ?.toLocaleString(undefined, {
                                      //   minimumFractionDigits: 2,
                                      //   maximumFractionDigits: 2,
                                      // })
                                    }
                                  </span>
                                </>
                              ) : (
                                <span
                                  style={{ fontSize: "16px" }}
                                  className="text-warning"
                                >
                                  {promise.currency}{" "}
                                  {
                                    formatAmount(promise.amount)

                                    // ?.toLocaleString(undefined, {
                                    //   minimumFractionDigits: 2,
                                    //   maximumFractionDigits: 2,
                                    // })
                                  }
                                </span>
                              )}
                            </>
                          )}
                        </td>
                        <td>{formatAccountId(promise.seller_account_id)}</td>
                        {/* <td>{promise.seller_email}</td> */}
                        <td>{formatAccountId(promise.buyer_account_id)}</td>
                        {/* <td>{promise.buyer_email}</td> */}
                        <td>
                          <>
                            {promise.seller_fulfilled_promise ? (
                              <>
                                <i
                                  className="fas fa-check-circle"
                                  style={{ fontSize: "16px", color: "green" }}
                                ></i>{" "}
                                Yes
                              </>
                            ) : (
                              <>
                                <i
                                  className="fas fa-times-circle"
                                  style={{ fontSize: "16px", color: "red" }}
                                ></i>{" "}
                                No
                              </>
                            )}
                          </>
                        </td>

                        <td>
                          <>
                            {promise.buyer_promise_fulfilled ? (
                              <>
                                <i
                                  className="fas fa-check-circle"
                                  style={{ fontSize: "16px", color: "green" }}
                                ></i>{" "}
                                Yes
                              </>
                            ) : (
                              <>
                                <i
                                  className="fas fa-times-circle"
                                  style={{ fontSize: "16px", color: "red" }}
                                ></i>{" "}
                                No
                              </>
                            )}
                          </>
                        </td>
                        <td>{promise.status}</td>
                        <td>
                          {promise.is_success ? (
                            <>
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Yes
                            </>
                          ) : (
                            <>
                              <i
                                className="fas fa-times-circle"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              No
                            </>
                          )}
                        </td>

                        <td>
                          <>
                            {promise.is_active ? (
                              <>
                                <i
                                  className="fas fa-check-circle"
                                  style={{ fontSize: "16px", color: "green" }}
                                ></i>{" "}
                                Yes
                              </>
                            ) : (
                              <>
                                <i
                                  className="fas fa-times-circle"
                                  style={{ fontSize: "16px", color: "red" }}
                                ></i>{" "}
                                No
                              </>
                            )}
                          </>
                        </td>

                        <td className="text-center">
                          {promise.duration}
                          {promise.is_active ? (
                            <>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="py-2 mt-2"
                                disabled
                              >
                                Timer:{" "}
                                <Timer
                                  expirationDate={promise?.expiration_date}
                                />
                              </Button>
                            </>
                          ) : (
                            <>
                              {promise.buyer_promise_fulfilled ? (
                                <>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="py-2 mt-2"
                                    disabled
                                  >
                                    Promise Settled
                                  </Button>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          {new Date(promise.expiration_date) < new Date() &&
                          !promise.buyer_promise_fulfilled ? (
                            <>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="py-2 mt-2"
                                onClick={() =>
                                  handleSettleDisputeOpen({
                                    promise_id: promise.promise_id,
                                  })
                                }
                              >
                                Settle Dispute
                              </Button>
                            </>
                          ) : (
                            <>
                              {promise.is_settle_conflict_activated ? (
                                <>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    className="py-2 mt-2"
                                    disabled
                                  >
                                    Settle Conflict Activated
                                  </Button>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </td>
                        <td>
                          {promise.is_settle_conflict_activated ? (
                            <>
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Yes
                            </>
                          ) : (
                            <>
                              <i
                                className="fas fa-times-circle"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              No
                            </>
                          )}
                        </td>
                        <td>
                          {promise.currency} {promise.settle_conflict_charges}
                        </td>
                        <td>
                          {promise.is_delivered ? (
                            <>
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Yes
                            </>
                          ) : (
                            <>
                              <i
                                className="fas fa-times-circle"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              No
                            </>
                          )}
                        </td>
                        <td>
                          {promise.is_cancelled ? (
                            <>
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Yes
                            </>
                          ) : (
                            <>
                              <i
                                className="fas fa-times-circle"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              No
                            </>
                          )}
                        </td>
                        <td>{promise.payment_method}</td>
                        <td>{promise.payment_provider}</td>
                        <td>
                          {new Date(promise.timestamp).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </td>

                        <td>
                          {promise.is_cancelled ? (
                            <>
                              <Button variant="danger" size="sm" disabled>
                                Promise Cancelled
                              </Button>
                            </>
                          ) : (
                            <>
                              {promise.seller_fulfilled_promise ? (
                                <>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    disabled
                                  >
                                    Promise Confirmed
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() =>
                                    handleConfirmPromiseOpen(promise.promise_id)
                                  }
                                >
                                  Confirm Promise
                                </Button>
                              )}
                            </>
                          )}
                        </td>

                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              clearMessageCounter(promise.promise_id)
                            }
                          >
                            <Link
                              to={`/seller/promise/message/${promise.promise_id}`}
                              style={{ textDecoration: "none" }}
                            >
                              Message Buyer
                              {promise?.seller_msg_count > 0 && (
                                <span className="msg-counter">
                                  {promise?.seller_msg_count}
                                </span>
                              )}
                            </Link>
                          </Button>
                        </td>

                        {/* <td>
                          <>
                            {promise.is_cancelled ? (
                              <>
                                <Button variant="outline-danger" size="sm">
                                  <Link
                                    to={`/promise/message/${promise.promise_id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    Message Buyer
                                  </Link>
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline-primary" size="sm">
                                <Link
                                  to={`/promise/message/${promise.promise_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Message Buyer
                                  {promise?.buyer_msg_count > 0 && (
                                <span className="msg-counter">
                                  {promise?.buyer_msg_count}
                                </span>
                              )}
                                </Link>
                              </Button>
                            )}
                          </>
                        </td> */}

                        <Modal
                          show={showConfirmPromise}
                          onHide={handleConfirmPromiseClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Confirm Promise
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {showConfirmPromise && (
                              <SellerConfirmPromise
                                promiseId={selectedPromiseId}
                              />
                            )}
                          </Modal.Body>
                        </Modal>

                        <Modal
                          show={showSettleDispute}
                          onHide={handleSettleDisputeClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Settle Disputed Promise
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {showSettleDispute && (
                              <SettleDisputedPromise
                                promiseId={selectedPromise?.promise_id}
                                amount={selectedPromise?.amount}
                                onClose={handleConfirmPromiseClose}
                              />
                            )}
                          </Modal.Body>
                        </Modal>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={promises.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PaysofterPromiseSeller;
