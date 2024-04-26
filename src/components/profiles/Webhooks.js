// Webhooks.js
import React from "react";
import { useSelector } from "react-redux";

import {Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function Webhooks() {
  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center py-3">
          <i className="fas fa-code"></i> SDK, Webhooks and Integrations
        </h2>

        {profileLoading && <Loader />}

        {profileError && <Message variant="danger">{profileError}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Python</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center "></div>
                  <Col>Django</Col>
                  <Col>Flask</Col>
                  <div className="text-center "></div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>JavaScript</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Venila JavaScript (+HTML5)</Col>
                  <Col>React</Col>
                  <Col>Vue</Col>
                  <Col>Angular</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Mobile Apps</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <h5 className="text-center py-2">Andriod</h5>

                  <Row>
                    <Col>React Native</Col>
                    <Col>Flutter</Col>
                  </Row>

                  <h5 className="text-center py-2">IOS</h5>

                  <Row>
                    <Col>Swift</Col>
                  </Row>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>PHP</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Wordpress</Col>
                  <Col>Laravel</Col>
                  <Col>Joomla</Col>
                  <Col>Prestashop</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Java</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Spring</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Ruby</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>Rail</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>C#</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>ASP.Net</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Webhooks;
