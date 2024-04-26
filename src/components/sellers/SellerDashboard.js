// SellerDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../../redux/actions/userActions";
import SellerProfile from "./SellerProfile";
import Transactions from "./Transactions"; 
import Payouts from "./Payouts";
import Dashboard from "./Dashboard"; 
// import MessageInbox from "./MessageInbox";
// import CreditPoint from "./CreditPoint";
// import AccountFunds from "./AccountFunds";
// import Referrals from "./Referrals";
import Webhooks from "./Webhooks";
import ApiEndPoints from "./ApiEndPoints";
import Subscriptions from "./Subscriptions";
import PaysofterPromiseSeller from "./PaysofterPromiseSeller";

function SellerDashboard({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo, history]);

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const handleAdminDashboard = () => {
  //   history.push("/admin-dashboard");
  // };

  // const handleSettings = () => {
  //   history.push("/settings");
  // };

  const handlePaysofterPromise = () => {
    history.push("/promise/seller");
  };

  // const handleAddbusiness = () => {
  //   history.push("/add-business");
  // };

  // const handleSellerDashboard = () => {
  //   history.push("/seller-dashboard");
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <SellerProfile />;

      case "transactions":
        return <Transactions />;

      case "payouts":
        return <Payouts />;

      case "webhooks":
        return <Webhooks />;

      case "api-endpoints":
        return <ApiEndPoints />;

      case "subscriptions":
        return <Subscriptions />;

      case "promise":
        return <PaysofterPromiseSeller />;

      // case "message-inbox":
      //   return <MessageInbox />;

      // case "credit-point":
      //   return <CreditPoint />;

      // case "recommended-products":
      //   return <RecommendedProducts />;

      // case "account-funds":
      //   return <AccountFunds />;

      // case "referrals":
      //   return <Referrals />;

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
                  <i className="fas fa-user"></i> Business Profile
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
                  <i className="fas fa-money-bill-wave"></i> Paysofter Promise 
                </Button>
              </div>


              {/* <div>
                <Button
                  variant={
                    activeTab === "account-funds"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("account-funds")}
                >
                  <i className="fas fa-money-bill-alt"></i> Acccount Funds
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "transactions" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("transactions")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Transactions
                </Button>
              </div>
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
              <div>
                <Button
                  variant={
                    activeTab === "payouts" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("payouts")}
                >
                  <i className="fas fa-credit-card"></i> Payouts
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "referrals" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div> */}

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

             

              {/* <div>
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
              </div> */}
              {/* 
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
              </div> */}

              {/* <div>
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
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "live-chat" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div> */}

              <div>
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
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "ticket" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "feedback" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedback")}
                >
                  <i className="fas fa-gear"></i> Feedback
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "settings" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={handleSettings}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div> */}

              {/* <div>
                {userInfo.is_superuser ? (
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
                     <i className="fas fa-user-check"></i> Admin 
                    </Button>
                  </div>
                ) : (
                  <span>Not Admin</span>
                )}
              </div> */}

              {/* <div>
                <span>
                  <Button
                    variant={
                      activeTab === "seller-account"
                        ? "primary"
                        : "outline-primary"
                    }
                    className="sidebar-link"
                    // onClick={() => handleAdminDashboard()}
                    onClick={() => handleTabChange("seller-account")}
                  >
                    <i className="fas fa-user-tag"></i> Seller Account
                  </Button>
                </span>
                <span>
                  <NavDropdown
                    // className="profile-dropdown custom-dropdown"
                    // align="end"
                  >
                    <span>
                      <Button variant="outline-primary" onClick={handleAddbusiness}>
                        Create Seller Account
                      </Button>
                      <Button variant="outline-primary" onClick={handleSellerDashboard}> 
                        Seller Dashboard
                      </Button>
                    </span>
                  </NavDropdown>
                </span>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleAdminDashboard()}
                >
                  <i className="fas fa-user-tag"></i> Admin Dashboard
                </Button>
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

export default SellerDashboard;
