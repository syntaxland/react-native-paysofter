// UserDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../../redux/actions/userActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { getUserMessages } from "../../redux/actions/messagingActions";
import {
  getBuyerPromises,
  getSellerPromises,
} from "../../redux/actions/PromiseActions";
import { listSupportTicket } from "../../redux/actions/supportActions";
import UserProfile from "./UserProfile";
// import Transactions from "./Transactions";
// import Payouts from "./Payouts";
import Dashboard from "./Dashboard";
import Inbox from "./Inbox";
// import CreditPoint from "./CreditPoint";
import AccountFunds from "./AccountFunds";
// import Referraols from "./Referrals";
// import Webhoks from "./Webhooks";
// import ApiEndPoints from "./ApiEndPoints";
import Subscriptions from "./Subscriptions";
import PaysofterPromise from "./PaysofterPromiseBuyer";
import SupportTicket from "../support/SupportTicket";
import CreateFeedback from "../feedback/CreateFeedback";

function UserDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo:", userInfo);

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  // console.log("profile:", profile?.is_usd_selected);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { messages } = getUserMessagesState;
  console.log("messages:", messages);

  const getSellerPromiseState = useSelector(
    (state) => state.getSellerPromiseState
  );
  const { promises: sellerPromises } = getSellerPromiseState;

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { promises: buyerPromises } = getBuyerPromiseState;

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { tickets } = listSupportTicketState;

  const supportMsgCounted = tickets?.reduce(
    (total, userMessages) => total + userMessages.user_msg_count,
    0
  );

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );
  console.log("msgCounted:", msgCounted);

  const sellerMsgCounted = sellerPromises?.reduce(
    (total, userMessages) => total + userMessages.seller_msg_count,
    0
  );

  const buyerMsgCounted = buyerPromises?.reduce(
    (total, userMessages) => total + userMessages.buyer_msg_count,
    0
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(getUserMessages());
      dispatch(getSellerPromises());
      dispatch(getBuyerPromises()); 
      dispatch(listSupportTicket());
    }
  }, [dispatch, userInfo]);

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminDashboard = () => {
    history.push("/dashboard/admin");
  };

  const handleSettings = () => {
    history.push("/settings");
  };

  const handlePaysofterPromise = () => {
    history.push("/promise/buyer");
  };

  const handleAddbusiness = () => {
    history.push("/create-seller-account");
  };

  const handleSellerDashboard = () => {
    history.push("/dashboard/sellers");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;

      // case "transactions":
      //   return <Transactions />;

      // case "payouts":
      //   return <Payouts />;

      // case "webhooks":
      //   return <Webhooks />;

      // case "api-endpoints":
      //   return <ApiEndPoints />;

      case "subscriptions":
        return <Subscriptions />;

      case "promise":
        return <PaysofterPromise />;

      case "message-inbox":
        return <Inbox />;

      // case "credit-point":
      //   return <CreditPoint />;

      case "create-feedback":
        return <CreateFeedback />;

      case "account-funds":
        return <AccountFunds />;

      // case "referrals":
      //   return <Referrals />;

      case "support-ticket":
        return <SupportTicket />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Row className="main-section">
        <Col xs={sidebarOpen ? 4 : 1} className="sidebar">
          <Button
            variant="link"
            className="sidebar-toggle-button"
            onClick={handleSidebarToggle}
          >
            {/* <FontAwesomeIcon icon={sidebarOpen ? faBars : faBars} /> */}
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </Button>

          {sidebarOpen && (
            <div className="sidebar-content">
              <div>
                <Button
                  variant={
                    activeTab === "user-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  // activeClassName="active-link"
                  onClick={() => handleTabChange("user-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "profile" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("profile")}
                >
                  <i className="fas fa-user"></i> User Profile
                </Button>
              </div>
              {/* <div>
                <Button
                  variant={
                    activeTab === "transactions" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("transactions")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Payments
                </Button>
              </div> */}
              {/* <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fas fa-cart-plus"></i> Purchased Items
                </Button>
              </div> */}
              {/* <div>
                <Button
                  variant={
                    activeTab === "payouts" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("payouts")}
                >
                  <i className="fas fa-credit-card"></i> Payouts
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "referrals" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "credit-point" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "account-funds"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("account-funds")}
                >
                  <i className="fa fa-credit-card"></i> Acccount Funds
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "promise" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  // onClick={() => handleTabChange("promise")}
                  onClick={handlePaysofterPromise}
                >
                  <i className="fa fa-credit-card"></i> Paysofter Promise
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "across" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("across")}
                >
                  <i className="fa fa-credit-card"></i> Paysofter Across
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "message-inbox"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("message-inbox")}
                >
                  <i className="fa fa-message"></i> Inbox{" "}
                  {msgCounted + sellerMsgCounted + buyerMsgCounted > 0 && (
                    <span className="msg-counter">
                      {msgCounted + sellerMsgCounted + buyerMsgCounted}
                    </span>
                  )}
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "offers" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("offers")}
                >
                  <i className="fa fa-gift"></i> Offers
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "subscriptions"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("subscriptions")}
                >
                  <i className="fa fa-plus"></i> Subscriptions
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "live-chat" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "api-endpoints"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("api-endpoints")}
                >
                  <i className="fas fa-code"></i> API EndPoints
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "webhooks" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("webhooks")}
                >
                  <i className="fas fa-codepen"></i> SDK & Webhooks
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "support-ticket"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("support-ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket{" "}
                  {supportMsgCounted > 0 && (
                    <span className="msg-counter">{supportMsgCounted}</span>
                  )}
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "create-feedback"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("create-feedback")}
                >
                  <i className="fa fa-comment-dots"></i> Feedback
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "settings" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  // onClick={history.push("/settings")}
                  onClick={handleSettings}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div>

              {/* <div>
                <span>
                  <NavDropdown
                    title={
                      <span>
                        <Button
                          variant={
                            activeTab === "seller-account"
                              ? "primary"
                              : "outline-primary"
                          }
                          className="sidebar-link"
                          onClick={() => handleTabChange("seller-account")}
                        >
                          <i className="fas fa-user-tag"></i> Seller Account
                        </Button>
                      </span>
                    }
                    // className="profile-dropdown custom-dropdown"
                    align="end"
                  >
                    <span>
                      <Button
                        variant="outline-primary"
                        onClick={handleAddbusiness}
                      >
                        Create Seller Account
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={handleSellerDashboard}
                      >
                        Go to Seller Dashboard
                      </Button>
                    </span>
                  </NavDropdown>
                </span>
              </div> */}

              <div>
                {profile.is_superuser || profile.is_staff ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "primary"
                          : "outline-primary"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                      <i className="fas fa-user-check"></i> Go to Admin
                      Dashboard
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="mt-2 py-2">
                {!profile.is_seller ? (
                  <div>
                    {/* <span>Don't have a Seller account?</span>  */}
                    <Button
                      size="sm"
                      className="sidebar-link py-2"
                      variant="outline-primary"
                      onClick={handleAddbusiness}
                    >
                      <i className="fa fa-user-alt"></i> Create Seller Account
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <Button
                        size="sm"
                        className="sidebar-link"
                        variant="outline-primary"
                        onClick={handleSellerDashboard}
                      >
                        <i className="fa fa-dashboard"></i> Go to Seller
                        Dashboard
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* <div>
                {userInfo.is_superuser || userInfo.is_staff ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "primary"
                          : "outline-primary"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                      <i className="fas fa-user-check"></i> Admin Dashboard
                    </Button>
                  </div>
                ) : (
                  <> </>
                )}
              </div> */}
            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 8 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </>
  );
}

export default UserDashboard;
