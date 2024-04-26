// Settings.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import { getUserProfile } from "../../redux/actions/userProfileActions";

import {
  getUserAccountFundBalance,
  getUserUsdAccountFundBalance,
} from "../../redux/actions/AccountFundActions";

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Accordion,
  Modal,
} from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

import ToggleAccountSettings from "./ToggleAccountSettings";
import MaxWithdrawalSettings from "./MaxWithdrawalSettings";

import SetMaxUsdWithdrawal from "./SetMaxUsdWithdrawal";
import ToggleUsdAccountSettings from "./ToggleUsdAccountSettings";

function Settings() {
  const dispatch = useDispatch();

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, error } = updateProfile;

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;
  console.log("accountFundBalance:", accountFundBalance);

  const getUserUsdAccountFundBalanceState = useSelector(
    (state) => state.getUserUsdAccountFundBalanceState
  );
  const { usdFundBalance } = getUserUsdAccountFundBalanceState;
  console.log("usdFundBalance:", usdFundBalance);

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const selectedCurrency = profile?.selected_currency;
  console.log("selected_currency:", profile?.selected_currency);

  // const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  // const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
  const [showSetMaxFund, setShowSetMaxFund] = useState(false);
  const [showToggleAccountSettings, setShowToggleAccountSettings] =
    useState(false);
  const [showDisableAccountSettings, setShowDisableAccountSettings] =
    useState(false);

  const handleDisableFundOpen = () => {
    setShowDisableAccountSettings(true);
  };
  const handleDisableFundClose = () => {
    setShowDisableAccountSettings(false);
  };

  const handleToggleFundOpen = () => {
    setShowToggleAccountSettings(true);
  };

  const handleToggleFundClose = () => {
    setShowToggleAccountSettings(false);
  };

  const handleSetMaxFundOpen = () => {
    setShowSetMaxFund(true);
  };

  const handleSetMaxFundClose = () => {
    setShowSetMaxFund(false);
  };

  const handleDeleteAccount = () => {
    history.push("/delete-account");
  };

  const handleChangePassword = () => {
    history.push("/change-password");
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserAccountFundBalance());
    dispatch(getUserUsdAccountFundBalance());
  }, [dispatch]);

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center py-3">
          <i className="fas fa-gear"></i> Settings
        </h2>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {selectedCurrency === "NGN" && (
              <div>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div>
                      <span>Account Fund ({selectedCurrency})</span>{" "}
                      {accountFundBalance?.is_diabled ? (
                        <>
                          {" "}
                          <span className="py-2">
                            <Button
                              variant="outline"
                              onClick={handleDisableFundOpen}
                              className="rounded"
                              size="sm"
                              title="Account Fund is currently disabled. Please contact support."
                            >
                              <i
                                className="fas fa-lock"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              Disabled
                            </Button>
                          </span>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            variant="outline"
                            onClick={handleToggleFundOpen}
                            className="rounded"
                            size="sm"
                            title="Set Account Fund active or locked."
                          >
                            {accountFundBalance?.is_active ? (
                              <>
                                <i
                                  className="fas fa-lock-open"
                                  style={{ fontSize: "16px", color: "green" }}
                                ></i>{" "}
                                Active
                              </>
                            ) : (
                              <>
                                <i
                                  className="fas fa-lock text-warning"
                                  style={{
                                    fontSize: "16px",
                                    // color: "yellow"
                                  }}
                                ></i>{" "}
                                Locked
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h3 className="py-2">Toggle Account Fund Status</h3>
                      <p>
                        Enable or disable Account Fund. Note that this action
                        will block or enable all transaction withdrawals from
                        this account.{" "}
                        <Button
                          variant="outline-primary"
                          onClick={handleToggleFundOpen}
                          className="rounded"
                          size="sm"
                          title="Set Account Fund active or locked."
                        >
                          {accountFundBalance?.is_active ? (
                            <>
                              <i
                                className="fa fa-toggle-off"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              Disable{" "}
                            </>
                          ) : (
                            <>
                              <i
                                className="fa fa-toggle-on"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Enable{" "}
                            </>
                          )}
                        </Button>
                      </p>

                      <Modal
                        show={showToggleAccountSettings}
                        onHide={handleToggleFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Toggle Account Fund Status
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {showToggleAccountSettings && (
                            <ToggleAccountSettings />
                          )}
                        </Modal.Body>
                      </Modal>

                      <Modal
                        show={showDisableAccountSettings}
                        onHide={handleDisableFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Account Fund Disabled
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p className="text-center  py-2">
                            Account Fund is currently disabled. Please contact
                            support for reactivation.
                          </p>
                        </Modal.Body>
                      </Modal>
                    </div>

                    <div>
                      <h3 className="py-2">Set Maximum Withdrawal</h3>
                      <strong className="py-2 mb-2">
                        Current Limit: {selectedCurrency}{" "}
                        {accountFundBalance?.max_withdrawal?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                      <p>
                        The maximum amount that can be withdrawn from this fund
                        account can be set.
                        <Button
                          variant="outline-primary"
                          onClick={handleSetMaxFundOpen}
                          title="Set Account Fund active or locked."
                        >
                          <i
                            className="fas fa-sack-dollar"
                            style={{ fontSize: "18px", color: "green" }}
                          ></i>{" "}
                          Set Limit
                        </Button>
                      </p>

                      <Modal
                        show={showSetMaxFund}
                        onHide={handleSetMaxFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Set Maximum Withdrawal Account
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {showSetMaxFund && <MaxWithdrawalSettings />}
                        </Modal.Body>
                      </Modal>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            )}

            {selectedCurrency === "USD" && (
              <div>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div>
                      <span>Account Fund ({selectedCurrency})</span>{" "}
                      {usdFundBalance?.is_diabled ? (
                        <>
                          {" "}
                          <span className="py-2">
                            <Button
                              variant="outline"
                              onClick={handleDisableFundOpen}
                              className="rounded"
                              size="sm"
                              title="Account Fund is currently disabled. Please contact support."
                            >
                              <i
                                className="fas fa-lock"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              Disabled
                            </Button>
                          </span>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            variant="outline"
                            onClick={handleToggleFundOpen}
                            className="rounded"
                            size="sm"
                            title="Set Account Fund active or locked."
                          >
                            {usdFundBalance?.is_active ? (
                              <>
                                <i
                                  className="fas fa-lock-open"
                                  style={{ fontSize: "16px", color: "green" }}
                                ></i>{" "}
                                Active
                              </>
                            ) : (
                              <>
                                <i
                                  className="fas fa-lock text-warning"
                                  style={{
                                    fontSize: "16px",
                                    // color: "yellow"
                                  }}
                                ></i>{" "}
                                Locked
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h3 className="py-2">Toggle Account Fund Status</h3>
                      <p>
                        Enable or disable Account Fund. Note that this action
                        will block or enable all transaction withdrawals from
                        this account.{" "}
                        <Button
                          variant="outline-primary"
                          onClick={handleToggleFundOpen}
                          className="rounded"
                          size="sm"
                          title="Set Account Fund active or locked."
                        >
                          {usdFundBalance?.is_active ? (
                            <>
                              <i
                                className="fa fa-toggle-off"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              Disable{" "}
                            </>
                          ) : (
                            <>
                              <i
                                className="fa fa-toggle-on"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Enable{" "}
                            </>
                          )}
                        </Button>
                      </p>

                      <Modal
                        show={showToggleAccountSettings}
                        onHide={handleToggleFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Toggle Account Fund Status
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {showToggleAccountSettings && (
                            <ToggleUsdAccountSettings />
                          )}
                        </Modal.Body>
                      </Modal>

                      <Modal
                        show={showDisableAccountSettings}
                        onHide={handleDisableFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Account Fund Disabled
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p className="text-center  py-2">
                            Account Fund is currently disabled. Please contact
                            support for reactivation.
                          </p>
                        </Modal.Body>
                      </Modal>
                    </div>

                    <div>
                      <h3 className="py-2">Set Maximum Withdrawal</h3>
                      <strong className="py-2 mb-2">
                        Current Limit: {selectedCurrency}{" "}
                        {usdFundBalance?.max_withdrawal?.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </strong>
                      <p>
                        The maximum amount that can be withdrawn from this fund
                        account can be set.
                        <Button
                          variant="outline-primary"
                          onClick={handleSetMaxFundOpen}
                          title="Set Account Fund active or locked."
                        >
                          <i
                            className="fas fa-sack-dollar"
                            style={{ fontSize: "18px", color: "green" }}
                          ></i>{" "}
                          Set Limit
                        </Button>
                      </p>

                      <Modal
                        show={showSetMaxFund}
                        onHide={handleSetMaxFundClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Set Maximum Withdrawal Account
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {showSetMaxFund && <SetMaxUsdWithdrawal />}
                        </Modal.Body>
                      </Modal>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            )}

            <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="****************"
                    readOnly
                  />
                </Form.Group>
                <div className="py-2"></div>
                <Button
                  className="rounded"
                  variant="success"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Appearance</Accordion.Header>
              <Accordion.Body>
                <Button variant="transparent">
                  <FontAwesomeIcon icon={faSun} /> Light{" "}
                </Button>

                <Button variant="transparent">
                  <FontAwesomeIcon icon={faMoon} /> Dark{" "}
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Delete Account</Accordion.Header>
              <Accordion.Body>
                <p>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="warning-icon"
                  />{" "}
                  Warning! This action is irreversible and all your data will be
                  deleted from our database.
                </p>
                <Button
                  variant="danger"
                  onClick={handleDeleteAccount}
                  className="rounded"
                >
                  Delete Account
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
