// AdminDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { listAllSupportTickets } from "../../redux/actions/supportActions";
import PaysofterPromise from "./PaysofterPromise";
import AccountFund from "./AccountFund";
// import OrderShipment from "./OrderShipment";
import SendMessage from "./SendMessage";
import MessageInbox from "./MessageInbox";
import SendEmail from "./SendEmail";
import Dashboard from "./Dashboard";
// import CreditPoint from "./CreditPoint";
// import SetPromoCode from "./SetPromoCode";
import Feedbacks from "./Feedbacks";
import SupportTicket from "./SupportTicket";

function AdminDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo:", userInfo);

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile } = userProfile;
  // console.log("profile:", profile);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const allTicketList = useSelector(
    (state) => state.allTicketList
  );
  const { tickets } = allTicketList;

  const supportMsgCounted = tickets?.reduce(
    (total, userMessages) => total + userMessages.admin_user_msg_count,
    0
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(listAllSupportTickets());
    }
  }, [dispatch, userInfo]);

  const [activeTab, setActiveTab] = useState("admin-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserDashboard = () => {
    history.push("/dashboard/users");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "all-promises":
        return <PaysofterPromise />;

      case "account-fund-balances":
        return <AccountFund />;

      // case "order-shipment":
      //   return <OrderShipment />;

      case "send-message":
        return <SendMessage />;

      case "message-inbox":
        return <MessageInbox />;

      case "send-email":
        return <SendEmail />;

      // case "credit-point-requests":
      //   return <CreditPoint />;

      // case "promo-code":
      //   return <PromoTimer />;

      case "feedbacks":
        return <Feedbacks />;

      case "support-ticket":
        return <SupportTicket />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={sidebarOpen ? 3 : 1} className="sidebar">
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
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("admin-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Admin Dashboard
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "all-promises" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("all-promises")}
                >
                  <i className="fas fa-luggage-cart"></i> Paysofter Promise
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "account-fund-balances"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("account-fund-balances")}
                >
                  <i className="fas fa-credit-card"></i> Account Fund
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "order-shipment" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "send-message" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-message")}
                >
                  <i className="fa-solid fa-message"></i> Send Message
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-email" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-email")}
                >
                  <i className="fa-solid fa-envelope"></i> Send Email
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
                  <i className="fa fa-message"></i> Inbox
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point-requests"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point-requests")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "set-promo-code"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("set-promo-code")}
                >
                  <i className="fas fa-gift"></i> Create Promo Code
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "promo-code" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("promo-code")}
                >
                  <i className="fas fa-gift"></i> Promo Code
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
                  <i className="fa fa-ticket"></i> Support Tickets{" "}
                  {supportMsgCounted > 0 && (
                    <span className="msg-counter">{supportMsgCounted}</span>
                  )}
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "feedbacks" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedbacks")}
                >
                  <i className="fa fa-ticket"></i> Feedbacks
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleUserDashboard()}
                >
                  User Dashboard
                </Button>
              </div>
            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 9 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
