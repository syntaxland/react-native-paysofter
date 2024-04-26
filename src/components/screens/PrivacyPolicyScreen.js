// PrivacyPolicyScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function PrivacyPolicyScreen() {
  return (
    <Container>
      <Row className="d-flex justify-content-center py-2 ">
        <Col>
          <h2 className="py-2 text-center">Privacy Policy</h2>

          <p>
            Welcome to Paysofter Inc! This Privacy Policy outlines how we
            collect, use, and protect your personal information when you use our
            payment processing services.
          </p>

          <h3>1. Information Collection</h3>
          <p>
            We collect personal information such as your name, email address,
            payment card details, and other necessary information to process
            transactions and provide our payment gateway services.
          </p>

          <h3>2. Use of Information</h3>
          <p>
            We use the information you provide to process payments, detect and
            prevent fraud, facilitate transactions, and improve our payment
            processing services. Your information may also be used for customer
            support and communication purposes.
          </p>

          <h3>3. Information Sharing</h3>
          <p>
            We may share your personal information with third-party service
            providers, financial institutions, and regulatory authorities as
            necessary to process payments and comply with legal requirements. We
            ensure that these parties adhere to strict confidentiality and data
            protection standards.
          </p>

          <h3>4. Security Measures</h3>
          <p>
            We employ industry-standard security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction. These measures include encryption,
            secure data storage, and regular security audits.
          </p>

          <h3>5. Data Retention</h3>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, comply with
            legal obligations, and resolve disputes. After the retention period,
            we securely dispose of or anonymize your information.
          </p>

          <h3>6. International Transfers</h3>
          <p>
            Your personal information may be transferred to and processed in
            countries outside of your own jurisdiction, where data protection
            laws may differ. We take appropriate measures to ensure that such
            transfers comply with applicable data protection laws and provide
            adequate protection for your information.
          </p>

          <h3>7. Changes to this Privacy Policy</h3>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. We will notify you of any changes by posting the new Privacy
            Policy on our website. It is your responsibility to review this
            Privacy Policy periodically for changes.
          </p>

          <h3>8. Contact Us</h3>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at privacy@paysofter.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PrivacyPolicyScreen;
