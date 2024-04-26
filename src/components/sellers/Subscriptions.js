// Subscriptions.js
import React  from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function Subscriptions() {

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center">
          Subscriptions <i className="fas fa-code"></i>
        </h2>

        {profileLoading && <Loader />}

        {profileError && <Message variant="danger">{profileError}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>CableTV</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <div className="text-center py-2"></div>
                  <Col>DSTV</Col>
                  <Col>Star Time</Col>
                  <Col>GoTV</Col>
                  <div className="text-center py-2"></div>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Mobile Data</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>MTN</Col>
                  <Col>GLO</Col>
                  <Col>Airtel</Col>
                  <Col>Smile</Col>
                  <Col>Star Link</Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Subscriptions;
