// CreateSellerAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { createSellerAccount } from "../../redux/actions/sellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";

function CreateSellerAccount({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); 
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const createSellerAccountState = useSelector(
    (state) => state.createSellerAccountState
  );
  const { success, error, loading } = createSellerAccountState;

  const [businessName, setBusinessName] = useState("");
  const [tradingName, setTradingName] = useState("");
  // const [businessRegNum, setBusinessRegNum] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  // const [businessType, setBusinessType] = useState("");
  const [staffSize, setStaffSize] = useState("");
  const [businessIndustry, setBusinessIndustry] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [supportEmail, setSupportEmail] = useState("");

  const [businessWebsite, setBusinessWebsite] = useState("");
  const [country, setCountry] = useState("");

  const [businessNameError, setBusinessNameError] = useState("");
  const [tradingNameError, setTradingNameError] = useState("");
  // const [businessRegNumError, setBusinessRegNumError] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  // const [businessTypeError, setBusinessTypeError] = useState("");
  const [staffSizeError, setStaffSizeError] = useState("");
  const [businessIndustryError, setBusinessIndustryError] = useState("");
  const [businessCategoryError, setBusinessCategoryError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "businessName":
        setBusinessName(value);
        setBusinessNameError("");
        break;
      case "tradingName":
        setTradingName(value);
        setTradingNameError("");
        break;

      // case "businessRegNum":
      //   setBusinessRegNum(value);
      //   setBusinessRegNumError("");
      //   break;
      case "businessAddress":
        setBusinessAddress(value);
        setBusinessAddressError("");
        break;
      // case "businessType":
      //   setBusinessType(value);
      //   setBusinessTypeError("");
      //   break;
      case "staffSize":
        setStaffSize(value);
        setStaffSizeError("");
        break;
      case "businessIndustry":
        setBusinessIndustry(value);
        setBusinessIndustryError("");
        break;
      case "businessCategory":
        setBusinessCategory(value);
        setBusinessCategoryError("");
        break;
      case "country":
        setCountry(value);
        setCountryError("");
        break;

      default:
        break;
    }
  };

  // const BUSINESS_TYPE_CHOICES = [
  //   ["Registered", "Registered"],
  //   ["Unregistered", "Unregistered"],
  // ];

  const STAFF_SIZE_CHOICES = [
    ["Small", "Small (1-50 employees)"],
    ["Medium", "Medium (51-250 employees)"],
    ["Large", "Large (251+ employees)"],
  ];

  const BUSINESS_INDUSTRY_CHOICES = [
    ["Information Technology", "Information Technology"],
    ["Healthcare", "Healthcare"],
    ["Finance", "Finance"],
    ["Education", "Education"],
    ["Retail", "Retail"],
    ["Manufacturing", "Manufacturing"],
    ["Services", "Services"],
    ["Entertainment", "Entertainment"],
    ["Food & Beverage", "Food & Beverage"],
    ["Travel & Tourism", "Travel & Tourism"],
    ["Real Estate", "Real Estate"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  const BUSINESS_CATEGORY_CHOICES = [
    ["Startup", "Startup"],
    ["Small Business", "Small Business"],
    ["Medium Business", "Medium Business"],
    ["Large Business", "Large Business"],
    ["Corporation", "Corporation"],
    ["Sole Proprietorship", "Sole Proprietorship"],
    ["Partnership", "Partnership"],
    ["Franchise", "Franchise"],
    ["Family Owned", "Family Owned"],
    ["Online Business", "Online Business"],
    ["Brick and Mortar", "Brick and Mortar"],
    ["Service Provider", "Service Provider"],
    ["Retailer", "Retailer"],
    ["Wholesaler", "Wholesaler"],
    ["Manufacturer", "Manufacturer"],
    ["Restaurant", "Restaurant"],
    ["Hospitality", "Hospitality"],
    ["Healthcare", "Healthcare"],
    ["Education", "Education"],
    ["Tech", "Tech"],
    ["Creative", "Creative"],
    ["Entertainment", "Entertainment"],
    ["Travel", "Travel"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  const sellerData = {
    business_name: businessName,
    trading_name: tradingName,
    // business_reg_num: businessRegNum,
    business_address: businessAddress,
    // business_type: businessType,
    staff_size: staffSize,
    business_industry: businessIndustry,
    business_category: businessCategory,
    business_description: businessDescription,
    business_phone: businessPhone,
    business_email: businessEmail,
    support_email: supportEmail,
    business_website: businessWebsite,
    country: country,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/create-business-status");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleCreateSellerAccount = (e) => {
    e.preventDefault(e);

    if (!businessName) {
      setBusinessNameError("Please enter the business name.");
    } else {
      setBusinessNameError("");
    }

    if (!tradingName) {
      setTradingNameError("Please enter the trading name.");
    } else {
      setTradingNameError("");
    }

    // if (!businessRegNum) {
    //   setBusinessRegNumError("Please enter the business registration number.");
    // } else {
    //   setBusinessRegNumError("");
    // }

    if (!businessAddress) {
      setBusinessAddressError("Please enter the business address.");
    } else {
      setBusinessAddressError("");
    }

    // if (!businessType) {
    //   setBusinessTypeError("Please select the business type.");
    // } else {
    //   setBusinessTypeError("");
    // }

    if (!staffSize) {
      setStaffSizeError("Please select the staff size.");
    } else {
      setStaffSizeError("");
    }

    if (!businessIndustry) {
      setBusinessIndustryError("Please select the business industry.");
    } else {
      setBusinessIndustryError("");
    }

    if (!businessCategory) {
      setBusinessCategoryError("Please select the business category.");
    } else {
      setBusinessCategoryError("");
    }

    if (!country) {
      setCountryError("Please enter the country.");
    } else {
      setCountryError("");
    }

    if (
      !businessName ||
      !tradingName ||
      // !businessRegNum ||
      !businessAddress ||
      // !businessType ||
      !staffSize ||
      !businessIndustry ||
      !businessCategory ||
      !country
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(createSellerAccount(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Create Seller Account</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Form submitted successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}

          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                value={businessName}
                onChange={(e) =>
                  handleFieldChange("businessName", e.target.value)
                }
                placeholder="Enter business name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{businessNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Trading Name</Form.Label>
              <Form.Control
                type="text"
                value={tradingName}
                onChange={(e) =>
                  handleFieldChange("tradingName", e.target.value)
                }
                placeholder="Enter trading name"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
              <Form.Text className="text-danger">{tradingNameError}</Form.Text>
            </Form.Group>

            {/* <Form.Group>
              <Form.Label>Business Status</Form.Label>
              <Form.Control
                as="select"
                value={businessType}
                onChange={(e) =>
                  handleFieldChange("businessType", e.target.value)
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
              <Form.Text className="text-danger">{businessTypeError}</Form.Text>
            </Form.Group> */}

            {/* <Form.Group>
              <Form.Label>Business Registration Number</Form.Label>
              <Form.Control
                type="text"
                value={businessRegNum}
                onChange={(e) =>
                  handleFieldChange("businessRegNum", e.target.value)
                }
                placeholder="Enter business registration number"
                className="rounded py-2 mb-2"
                maxLength={50}
                required
              />
              <Form.Text className="text-danger">
                {businessRegNumError}
              </Form.Text>
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Business Industry</Form.Label>
              <Form.Control
                as="select"
                value={businessIndustry}
                onChange={(e) =>
                  handleFieldChange("businessIndustry", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Industry</option>
                {BUSINESS_INDUSTRY_CHOICES.map((industry) => (
                  <option key={industry[0]} value={industry[0]}>
                    {industry[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">
                {businessIndustryError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Category</Form.Label>
              <Form.Control
                as="select"
                value={businessCategory}
                onChange={(e) =>
                  handleFieldChange("businessCategory", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Category</option>
                {BUSINESS_CATEGORY_CHOICES.map((category) => (
                  <option key={category[0]} value={category[0]}>
                    {category[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">
                {businessCategoryError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Staff Size</Form.Label>
              <Form.Control
                as="select"
                value={staffSize}
                onChange={(e) => handleFieldChange("staffSize", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Staff Size</option>
                {STAFF_SIZE_CHOICES.map((size) => (
                  <option key={size[0]} value={size[0]}>
                    {size[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{staffSizeError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Description</Form.Label>
              <Form.Control
                type="text"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Enter business description"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Phone</Form.Label>
              <Form.Control
                type="text"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                placeholder="Enter business phone"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Email</Form.Label>
              <Form.Control
                type="text"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="Enter business email"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Support Email</Form.Label>
              <Form.Control
                type="text"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="Enter business support email"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Website</Form.Label>
              <Form.Control
                type="text"
                value={businessWebsite}
                onChange={(e) => setBusinessWebsite(e.target.value)}
                placeholder="Enter business description"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Address</Form.Label>
              <Form.Control
                type="text"
                value={businessAddress}
                onChange={(e) =>
                  handleFieldChange("businessAddress", e.target.value)
                }
                placeholder="Enter business address"
                className="rounded py-2 mb-2"
                maxLength={225}
                required
              />
              <Form.Text className="text-danger">
                {businessAddressError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                placeholder="Enter country"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
              <Form.Text className="text-danger">{countryError}</Form.Text>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            onClick={handleCreateSellerAccount}
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

export default CreateSellerAccount;
