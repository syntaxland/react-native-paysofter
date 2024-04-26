// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  getUserProfile,
  updateUserProfile,
  // updateUserAvatar,
} from "../../redux/actions/userProfileActions";
import { resendEmailOtp } from "../../redux/actions/emailOtpActions";
import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function UserProfile() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, success, error } = updateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [successMessage, setSuccessMessage] = useState("");
  const [isSecurityCodeCopied, setIsSecurityCodeCopied] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);
  const [isAccountIdCopied, setIsAccountIdCopied] = useState(false);

  const history = useHistory();

  // const handleAvatarChange = (e) => {
  //   const avatar = e.target.files[0];
  //   if (avatar) {
  //     const formData = new FormData();
  //     formData.append("avatar", avatar);
  //     dispatch(updateUserAvatar(formData));
  //   }
  // };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    // avatar: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        // avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        // avatar: userInfo.avatar,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [success]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        avatar: files[0],
      }));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  // const handleDeleteAccount = () => {
  //   history.push("/delete-account");
  // };

  const handleResendEmailOtp = () => {
    dispatch(resendEmailOtp(userInfo.email, userInfo.first_name));
    history.push("/verify-email-otp");
  };

  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  // const handleChangePassword = () => {
  //   history.push("/change-password");
  // };

  const copyToClipboardSecCode = (text) => {
    navigator.clipboard.writeText(text);
    setIsSecurityCodeCopied(true);
    setTimeout(() => {
      setIsSecurityCodeCopied(false);
    }, 3000);
  };

  const copyToClipboardAccountID = (text) => {
    navigator.clipboard.writeText(text);
    setIsAccountIdCopied(true);
    setTimeout(() => {
      setIsAccountIdCopied(false);
    }, 3000);
  };

  const toggleSecurityCodeVisibility = () => {
    setSecurityCodeVisible(!securityCodeVisible);
  };

  // const formatAccountID = (accountID) => {
  //   if (accountID) {
  //     return accountID.match(/.{1,4}/g).join("-");
  //   }
  //   return "";
  // };

  return (
    <Container Fluid>
      <Row>
        {userInfo.is_verified ? (
          <h2 className="text-center">
            Profile <i className="fas fa-user-check"></i>
          </h2>
        ) : (
          <h2 className="text-center">
            Profile <i className="fas fa-user"></i>
          </h2>
        )}

        {loading && <Loader />}
        {profileLoading && <Loader />}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}

        {error && <Message variant="danger">{error}</Message>}
        {profileError && <Message variant="danger">{error}</Message>}

        <p>
          Verified{" "}
          {userInfo.is_verified ? (
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "18px", color: "white" }}
            ></i>
          ) : (
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "18px", color: "red" }}
            ></i>
          )}
        </p>

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Bio</Accordion.Header>
              <Accordion.Body>
                <Form encType="multipart/form-data">
                  {!userInfo.is_verified && (
                    <Button variant="primary" onClick={handleVerifyEmail}>
                      Verify Email
                    </Button>
                  )}

<Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      // value={userData.first_name}
                      value={profile.username}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Account ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={profile.account_id}
                      // value={formatAccountID(profile.account_id)}
                      readOnly
                    />

                    <Button
                      variant="outline"
                      className="rounded"
                      size="sm"
                      onClick={() =>
                        copyToClipboardAccountID(profile.account_id)
                      }
                    >
                      {isAccountIdCopied ? (
                        <span>
                          <i className="fa fa-check"></i> Copied
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-copy"></i> Copy
                        </span>
                      )}
                    </Button>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Securty Code</Form.Label>
                    <Form.Control
                      type={securityCodeVisible ? "text" : "password"}
                      name="first_name"
                      value={profile.security_code}
                      readOnly
                    />
                    <div>
                      <span>
                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={toggleSecurityCodeVisibility}
                        >
                          {securityCodeVisible ? (
                            <span>
                              <i className="fa fa-eye-slash"></i> Hide
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-eye"></i> Show
                            </span>
                          )}
                        </Button>
                        {/* {securityCodeVisible ? profile.security_code : "****"} */}
                      </span>
                      <Button
                        variant="outline"
                        className="rounded"
                        size="sm"
                        onClick={() =>
                          copyToClipboardSecCode(profile.security_code)
                        }
                      >
                        {isSecurityCodeCopied ? (
                          <span>
                            <i className="fa fa-check"></i> Copied
                          </span>
                        ) : (
                          <span>
                            <i className="fa fa-copy"></i> Copy
                          </span>
                        )}
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      // value={userData.first_name}
                      value={
                        userData.first_name
                          ? userData.first_name.charAt(0).toUpperCase() +
                            userData.first_name.slice(1)
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      // value={userData.last_name}
                      value={
                        userData.last_name
                          ? userData.last_name.charAt(0).toUpperCase() +
                            userData.last_name.slice(1)
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={profile.email}
                      readOnly
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      value={userData.phone_number}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-right pt-3">
                    <Button
                      className="rounded"
                      variant="success"
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </Button>{" "}
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="****************"
                    value={userInfo.password}
                    readOnly
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  className="rounded"
                  variant="success"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Accordion.Body>
            </Accordion.Item> */}

            {/* <Accordion.Item eventKey="2">
              <Accordion.Header>Update Avatar</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item> */}

            <Accordion.Item eventKey="3">
              <Accordion.Header>Referrals</Accordion.Header>
              <Accordion.Body>
                <div>
                  <div>Referred Users: ()</div>
                  <div>Referral Link: {profile.referral_link}</div>
                  <div>Referral Code: {profile.referral_code}</div>
                  <div>
                    {" "}
                    <Button>Generate New Referral Link</Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="4">
              <Accordion.Header>API Endpoints</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center py-2">
                    <h2>Test API keys</h2>
                  </div>
                  <Col>Test API key: {profile.test_api_key}</Col>
                  <Col>Test Secret Key: {profile.test_api_secret_key}</Col>

                  <div className="text-center py-2">
                    <h2>Live API keys</h2>
                  </div>

                  <Col>Live API Key: {profile.live_api_key}</Col>
                  <Col>Live API Secret Key: {profile.live_api_secret_key}</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item> */}

            {/* <Accordion.Item eventKey="5">
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
            </Accordion.Item> */}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
