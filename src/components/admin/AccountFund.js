// AccountFund.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import { getAllAccountFundBalance } from "../../redux/actions/AccountFundActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import ActivateAccountFund from "./ActivateAccountFund";

function AccountFund({history}) {
  const dispatch = useDispatch();

  const getAllAccountFundBalanceState = useSelector(
    (state) => state.getAllAccountFundBalanceState
  );
  const { loading, accountFunds, error } = getAllAccountFundBalanceState;
  console.log("AccountFund:", accountFunds);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const [showActivateAccountFund, setActivateAccountFund] = useState(false);
  const [selectedAccountFund, setSelectedAccountFund] = useState(null);

  const handleActivateAccountFundOpen = (accountFund) => {
    setSelectedAccountFund(accountFund);
    setActivateAccountFund(true);
  };

  const handleActivateAccountFundClose = () => {
    setActivateAccountFund(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accountFunds?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getAllAccountFundBalance());
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-credit-card"></i> Account Fund Balances (All)
          </h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Account Fund balances appear here.
                </div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>User</th>
                      <th>Account ID</th>
                      <th>Balance</th>
                      <th>Maximum Withdrawal</th>
                      <th>Active</th>
                      <th>Disabled</th>
                      <th>Timestamp </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((accountFund, index) => (
                      <tr key={accountFund.id}>
                        <td>{index + 1}</td>
                        <td>
                          <td>{accountFund.user_email}</td>
                        </td>
                        <td>{accountFund.account_id}</td>
                        <td>{accountFund.balance}</td>
                        <td>{accountFund.max_withdrawal}</td>
                        <td>
                          {accountFund.is_active ? (
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
                            {accountFund.is_diabled ? (
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
                            {accountFund.is_diabled ? (
                              <>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="py-2 mt-2"
                                  onClick={() =>
                                    handleActivateAccountFundOpen({
                                      account_id: accountFund?.account_id,
                                    })
                                  }
                                >
                                  Enable Account Fund
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        </td>

                        <td>
                          {new Date(accountFund.timestamp).toLocaleString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }
                          )}
                        </td>

                        <Modal
                          show={showActivateAccountFund}
                          onHide={handleActivateAccountFundClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                            Enable Account Fund
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {showActivateAccountFund && (
                              <ActivateAccountFund
                              accountId={selectedAccountFund?.account_id}
                                onClose={handleActivateAccountFundClose}
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
                totalItems={accountFunds.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AccountFund;
