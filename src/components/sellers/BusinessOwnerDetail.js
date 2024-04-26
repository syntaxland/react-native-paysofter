// BusinessOwnerDetail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { businessOwnerDetail } from "../../redux/actions/sellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import DatePicker from "react-datepicker";
// import { parseISO } from "date-fns";

function BusinessOwnerDetail({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); 
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const businessOwnerDetailState = useSelector(
    (state) => state.businessOwnerDetailState
  );
  const { success, error, loading } = businessOwnerDetailState;

  const [directorName, setDirectorName] = useState("");
  const [directorNameError, setDirectorNameError] = useState("");

  const [idType, setIdType] = useState("");
  const [idTypeError, setIdTypeError] = useState("");

  const [idNumber, setIdNumber] = useState("");
  const [idNumberError, setIdNumberError] = useState("");

  const [idCardImage, setIdCardImage] = useState("");
  const [idCardImageError, setIdCardImageError] = useState("");

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [proofOfAddress, setProofOfAddress] = useState("");
  const [proofOfAddressError, setProofOfAddressError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "directorName":
        setDirectorName(value);
        setDirectorNameError("");
        break;

      case "idType":
        setIdType(value);
        setIdTypeError("");
        break;

      case "idNumber":
        setIdNumber(value);
        setIdNumberError("");
        break;
      case "idCardImage":
        setIdCardImage(value);
        setIdCardImageError("");
        break;
      case "dob":
        setDob(value);
        setDobError("");
        break;
      case "address":
        setAddress(value);
        setAddressError("");
        break;

      case "proofOfAddress":
        setProofOfAddress(value);
        setProofOfAddressError("");
        break;

      default:
        break;
    }
  };

  const ID_TYPE_CHOICES = [
    // ["NIN", "NIN"],
    ["Intl Passport", "Intl Passport"],
    ["Driving License", "Driving License"],
    ["Govt Issued ID", "Govt Issued ID"],
  ];

  const sellerData = new FormData();
  sellerData.append("director_name", directorName); 
  sellerData.append("id_type", idType);
  sellerData.append("id_number", idNumber);
  sellerData.append("id_card_image", idCardImage);
  sellerData.append("dob", dob);
  sellerData.append("address", address);
  sellerData.append("proof_of_address", proofOfAddress);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/seller/bank");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleBusinessOwnerDetail = (e) => {
    e.preventDefault(e);

    if (!directorName) {
      setDirectorNameError("Please enter the director name.");
    } else {
      setDirectorNameError("");
    }

    if (!idType) {
      setIdTypeError("Please select the ID type.");
    } else {
      setIdTypeError("");
    }

    if (!idNumber) {
      setIdNumberError("Please enter the ID  number.");
    } else {
      setIdNumberError("");
    }

    if (!idCardImage) {
      setIdCardImageError("Please upload the ID card Photo.");
    } else {
      setIdCardImageError("");
    }

    if (!dob) {
      setDobError("Please enter your date of birth.");
    } else {
      setDobError("");
    }

    if (!address) {
      setAddressError("Please enter your home address.");
    } else {
      setAddressError("");
    }

    if (!proofOfAddress) {
      setProofOfAddressError("Please upload your proof of address.");
    } else {
      setProofOfAddressError("");
    }

    if (
      !directorName ||
      !idType ||
      !idNumber ||
      !idCardImage ||
      !dob ||
      !address ||
      !proofOfAddress
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(businessOwnerDetail(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Business Owner(s) Details</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>Form submitted successfully.</Message>
          )}
          {error && <Message variant="danger" fixed>{error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Director Name</Form.Label>
              <Form.Control
                type="text"
                value={directorName}
                onChange={(e) =>
                  handleFieldChange("directorName", e.target.value)
                }
                placeholder="Enter the director name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{directorNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Type</Form.Label>
              <Form.Control
                as="select"
                value={idType}
                onChange={(e) => handleFieldChange("idType", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">ID Type</option>
                {ID_TYPE_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{idTypeError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                value={idNumber}
                onChange={(e) => handleFieldChange("idNumber", e.target.value)}
                placeholder="Enter ID Number"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{idNumberError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>ID Card Photo </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  handleFieldChange("idCardImage", e.target.files[0])
                }
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{idCardImageError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date Of Birth</Form.Label>
              {/* <Form.Control
                type="text"
                value={dob}
                onChange={(e) => handleFieldChange("dob", e.target.value)}
                placeholder="Enter date of birth"
                className="rounded py-2 mb-2"
                maxLength={50}
                required
              /> */}
              <div>
                <DatePicker
                  selected={dob ? new Date(dob) : null}
                  onChange={(date) => setDob(date)}
                  dateFormat="dd/MM/yyyy"
                  className="rounded py-2 mb-2 form-control"
                  placeholderText="Select date of birth"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableMonthYearDropdown
                />
              </div>
              <Form.Text className="text-danger">{dobError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                placeholder="Enter home address"
                className="rounded py-2 mb-2"
                maxLength={225}
                required
              />
              <Form.Text className="text-danger">{addressError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Proof Of Address</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  handleFieldChange("proofOfAddress", e.target.files[0])
                }
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
              <Form.Text className="text-danger">
                {proofOfAddressError}
              </Form.Text>
            </Form.Group>

            {formError && <Message variant="danger" fixed>{formError}</Message>}
            
          </Form>
          <Button
            variant="primary"
            onClick={handleBusinessOwnerDetail}
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

export default BusinessOwnerDetail;
