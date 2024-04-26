// TermsAndConditionScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function TermsAndConditionScreen() {
  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          <h2 className="py-2">Terms and Conditions</h2>

          <p>
            Welcome to our platform! These terms and conditions outline the
            rules and regulations for the use of our services.
          </p>

          <h3>Section 1: Introduction</h3>
          <p>
            By accessing this platform, we assume you accept these terms and
            conditions. Do not continue to use our platform if you do not agree
            to take all of the terms and conditions stated on this page.
          </p>

          <h3>Section 2: Paysofter</h3>
          <p>
            Our platform uses a combination of Paysofter Promise and Paysofter
            Account Fund, Debit Cards, and other conventional means as payment
            gateways. The following terms and conditions apply to each:
          </p>

          {/* <h4>2.1 Paysofter</h4> */}
          <p>
            - Payment through Paysofter is subject to the terms and conditions
            of the Paysofter Inc.
          </p>
          <p>
            - Users are responsible for understanding and complying with
            Paysofter's policies.
          </p>

          {/* <h4>2.2 Paysofter</h4>
          <p>
            - Payment through Paysofter is subject to the terms and conditions of
            Paysofter.
          </p>
          <p>
            - Users are responsible for understanding and complying with Paysofter's
            policies.
          </p> */}

          <h3>Section 3: User Responsibilities</h3>
          <p>
            - Users are responsible for ensuring the accuracy of their payment
            information.
          </p>
          <p>
            - Users must comply with the terms and conditions of Paysofter when making payments.
          </p>

          <h3>Section 4: Changes to Terms</h3>
          <p>
            We reserve the right to revise these terms and conditions at any
            time. By using our platform, you agree to be bound by the current
            version of these terms and conditions.
          </p>

          <h3>Section 5: Contact Information</h3>
          <p>
            If you have any questions about these terms and conditions, please
            contact us at support@paysofter.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default TermsAndConditionScreen;
