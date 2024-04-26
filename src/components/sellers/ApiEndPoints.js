// ApiEndPoints.js
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Row, Col, Container, Accordion, Button, Form } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function ApiEndPoints() {
  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  const [isTestSecretKeyCopied, setIsTestSecretKeyCopied] = useState(false);
  const [testSecretKeyVisible, setTestSecretKeyVisible] = useState(false);
  const [isTestKeyCopied, setIsTestKeyCopied] = useState(false);

  const [isLiveSecretKeyCopied, setIsLiveSecretKeyCopied] = useState(false);
  const [liveSecretKeyVisible, setLiveSecretKeyVisible] = useState(false);
  const [isLiveKeyCopied, setIsLiveKeyCopied] = useState(false);

  const copyToClipboardTestSecretKey = (text) => {
    navigator.clipboard.writeText(text);
    setIsTestSecretKeyCopied(true);
    setTimeout(() => {
      setIsTestSecretKeyCopied(false);
    }, 3000);
  };

  const copyToClipboardTestKey = (text) => {
    navigator.clipboard.writeText(text);
    setIsTestKeyCopied(true);
    setTimeout(() => {
      setIsTestKeyCopied(false);
    }, 3000);
  };

  const toggleTestSecretKeyVisibility = () => {
    setTestSecretKeyVisible(!testSecretKeyVisible);
  };

  const copyToClipboardLiveSecretKey = (text) => {
    navigator.clipboard.writeText(text);
    setIsLiveSecretKeyCopied(true);
    setTimeout(() => {
      setIsLiveSecretKeyCopied(false);
    }, 3000);
  };

  const copyToClipboardLiveKey = (text) => {
    navigator.clipboard.writeText(text);
    setIsLiveKeyCopied(true);
    setTimeout(() => {
      setIsLiveKeyCopied(false);
    }, 3000);
  };

  const toggleLiveSecretKeyVisibility = () => {
    setLiveSecretKeyVisible(!liveSecretKeyVisible);
  };

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center">
          <i className="fas fa-code"></i> Api EndPoints & Keys
        </h2>

        {profileLoading && <Loader />}

        {profileError && <Message variant="danger">{profileError}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Test API keys</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Form.Group>
                    <Form.Label>Test API Public key</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={profile.test_api_key}
                      readOnly
                    />

                    <Button
                      variant="outline"
                      className="rounded"
                      size="sm"
                      onClick={() =>
                        copyToClipboardTestKey(profile.test_api_key)
                      }
                    >
                      {isTestKeyCopied ? (
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
                    <Form.Label>Test Secret Key</Form.Label>
                    <Form.Control
                      type={testSecretKeyVisible ? "text" : "password"}
                      name="first_name"
                      value={profile.test_api_secret_key}
                      readOnly
                    />
                    <div>
                      <span>
                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={toggleTestSecretKeyVisibility}
                        >
                          {testSecretKeyVisible ? (
                            <span>
                              <i className="fa fa-eye-slash"></i> Hide
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-eye"></i> Show
                            </span>
                          )}
                        </Button>
                      </span>
                      <Button
                        variant="outline"
                        className="rounded"
                        size="sm"
                        onClick={() =>
                          copyToClipboardTestSecretKey(
                            profile.test_api_secret_key
                          )
                        }
                      >
                        {isTestSecretKeyCopied ? (
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
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Live API keys</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Form.Group>
                    <Form.Label>Live API Public key</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={profile.live_api_key}
                      readOnly
                    />

                    <Button
                      variant="outline"
                      className="rounded"
                      size="sm"
                      onClick={() =>
                        copyToClipboardLiveKey(profile.live_api_key)
                      }
                    >
                      {isLiveKeyCopied ? (
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
                    <Form.Label>Live Secret Key</Form.Label>
                    <Form.Control
                      type={liveSecretKeyVisible ? "text" : "password"}
                      name="first_name"
                      value={profile.live_api_secret_key}
                      readOnly
                    />
                    <div>
                      <span>
                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={toggleLiveSecretKeyVisibility}
                        >
                          {liveSecretKeyVisible ? (
                            <span>
                              <i className="fa fa-eye-slash"></i> Hide
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-eye"></i> Show
                            </span>
                          )}
                        </Button>
                      </span>
                      <Button
                        variant="outline"
                        className="rounded"
                        size="sm"
                        onClick={() =>
                          copyToClipboardLiveSecretKey(
                            profile.live_api_secret_key
                          )
                        }
                      >
                        {isLiveSecretKeyCopied ? (
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
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default ApiEndPoints;
