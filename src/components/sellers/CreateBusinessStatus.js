// CreateBusinessStatus.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { createBusinessStatus } from "../../redux/actions/sellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";

function CreateBusinessStatus({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const createBusinessStatusState = useSelector(
    (state) => state.createBusinessStatusState
  );
  const { success, error, loading } = createBusinessStatusState;

  const [businessName, setBusinessName] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");

  const [businessStatus, setBusinessStatus] = useState("");
  const [businessStatusError, setBusinessStatusError] = useState("");

  const [businessRegNum, setBusinessRegNum] = useState("");
  const [businessRegNumError, setBusinessRegNumError] = useState("");

  const [businessRegCert, setBusinessRegCert] = useState("");
  const [businessRegCertError, setBusinessRegCertError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "businessName":
        setBusinessName(value);
        setBusinessNameError("");
        break;

      case "businessStatus":
        setBusinessStatus(value);
        setBusinessStatusError("");
        break;

      case "businessRegNum":
        setBusinessRegNum(value);
        setBusinessRegNumError("");
        break;
      case "businessRegCert":
        setBusinessRegCert(value);
        setBusinessRegCertError("");
        break;

      default:
        break;
    }
  };

  const BUSINESS_TYPE_CHOICES = [
    ["Registered", "Registered"],
    ["Unregistered", "Unregistered"],
  ];

  const sellerData = new FormData();
  sellerData.append("business_name", businessName);
  sellerData.append("business_status", businessStatus);
  sellerData.append("business_reg_num", businessRegNum);
  sellerData.append("business_reg_cert", businessRegCert); 

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/seller/details");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleCreateBusinessStatus = (e) => {
    e.preventDefault(e);

    if (!businessName) {
      setBusinessNameError("Please enter the business name.");
    } else {
      setBusinessNameError("");
    }

    if (!businessStatus) {
      setBusinessStatusError("Please select the business status.");
    } else {
      setBusinessStatusError("");
    }

    // if (!businessRegNum) {
    //   setBusinessRegNumError("Please enter the business registration number.");
    // } else {
    //   setBusinessRegNumError("");
    // }

    // if (!businessRegCert) {
    //   setBusinessRegCertError(
    //     "Please upload the business registration certificate."
    //   );
    // } else {
    //   setBusinessRegCertError("");
    // }

    if (
      !businessName ||
      !businessStatus
      // !businessRegNum ||
      // !businessRegCert
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(createBusinessStatus(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Business Status</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>Form submitted successfully.</Message>
          )}
          {error && <Message variant="danger" fixed>{error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                value={businessName}
                onChange={(e) =>
                  handleFieldChange("businessName", e.target.value)
                }
                placeholder="Enter the Business Name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{businessNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Status</Form.Label>
              <Form.Control
                as="select"
                value={businessStatus}
                onChange={(e) =>
                  handleFieldChange("businessStatus", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Status</option>
                {BUSINESS_TYPE_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">
                {businessStatusError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Registration Number</Form.Label>
              <Form.Control
                type="text"
                value={businessRegNum}
                onChange={(e) =>
                  handleFieldChange("businessRegNum", e.target.value)
                }
                placeholder="Enter Business Registration Number"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
              <Form.Text className="text-danger">
                {businessRegNumError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Registration Certificate</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  handleFieldChange("businessRegCert", e.target.files[0])
                }
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
              <Form.Text className="text-danger">
                {businessRegCertError}
              </Form.Text>
            </Form.Group>

            {formError && <Message variant="danger" fixed>{formError}</Message>}
          </Form>
          <Button
            variant="primary"
            onClick={handleCreateBusinessStatus}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={loading || success}
          >
            <div className="d-flex justify-content-center">
              <span className="py-1">Continue</span>
              {loading && <LoaderButton />}
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateBusinessStatus;
