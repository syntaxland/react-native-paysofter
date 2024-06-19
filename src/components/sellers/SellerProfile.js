// SellerProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  getSellerAccount,
  updateSellerAccount,
  getBusinessOwnerDetails,
  updateBusinessOwnerDetails,
  getBusinessBankAccount,
  updateBusinessBankAccount,
  getBvn,
  updateBvn, 
  getSellerPhoto,
  updateSellerPhoto,
  getBusinessStatus,
  updateBusinessStatus,
} from "../../redux/actions/sellerActions";
import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import DatePicker from "react-datepicker";
// import { parseISO } from "date-fns";

function SellerProfile() {
  const dispatch = useDispatch();

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const {
    loading: getSellerAccountLoading,
    error: getSellerAccountError,
    sellerAccount,
  } = getSellerAccountState;
  console.log("sellerAccount:", sellerAccount);

  const updateSellerAccountState = useSelector(
    (state) => state.updateSellerAccountState
  );
  const {
    loading: updateSellerAccountLoading,
    success: updateSellerAccountSuccess,
    error: updateSellerAccountError,
  } = updateSellerAccountState;

  const getBusinessStatusState = useSelector(
    (state) => state.getBusinessStatusState
  );
  const { businessStatus } = getBusinessStatusState;
  console.log("businessStatus:", businessStatus);

  const updateBusinessStatusState = useSelector(
    (state) => state.updateBusinessStatusState
  );
  const {
    loading: updateBusinessStatusLoading,
    success: updateBusinessStatusSuccess,
    error: updateBusinessStatusError,
  } = updateBusinessStatusState;

  const getBusinessOwnerDetailsState = useSelector(
    (state) => state.getBusinessOwnerDetailsState
  );
  const { sellerDetails } = getBusinessOwnerDetailsState;
  console.log(
    "sellerDetails:",
    sellerDetails,
    "proof_of_address",
    sellerDetails?.proof_of_address
  );

  const updateBusinessOwnerDetailsState = useSelector(
    (state) => state.updateBusinessOwnerDetailsState
  );
  const {
    loading: updateBusinessOwnerDetailsLoading,
    success: updateBusinessOwnerDetailsSuccess,
    error: updateBusinessOwnerDetailsError,
  } = updateBusinessOwnerDetailsState;

  const getBankAccountState = useSelector((state) => state.getBankAccountState);
  const { sellerBankAccount } = getBankAccountState;
  console.log("sellerBankAccount:", sellerBankAccount);

  const updateBankAccountState = useSelector(
    (state) => state.updateBankAccountState
  );
  const {
    loading: updateBankAccountLoading,
    success: updateBankAccountSuccess,
    error: updateBankAccountError,
  } = updateBankAccountState;

  const getSellerBvnState = useSelector((state) => state.getSellerBvnState);
  const { sellerBvn } = getSellerBvnState;
  console.log("sellerBvn:", sellerBvn);

  const updateSellerBvnState = useSelector(
    (state) => state.updateSellerBvnState
  );
  const {
    loading: updateSellerBvnLoading,
    success: updateSellerBvnSuccess,
    error: updateSellerBvnError,
  } = updateSellerBvnState;

  const getSellerPhotoState = useSelector((state) => state.getSellerPhotoState);
  const { sellerPhoto } = getSellerPhotoState;
  console.log("sellerPhoto:", sellerPhoto);

  const updateSellerPhotoState = useSelector(
    (state) => state.updateSellerPhotoState
  );
  const {
    loading: updateSellerPhotoLoading,
    success: updateSellerPhotoSuccess,
    error: updateSellerPhotoError,
  } = updateSellerPhotoState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const ID_TYPE_CHOICES = [
    // ["NIN", "NIN"],
    ["Intl Passport", "Intl Passport"],
    ["Driving License", "Driving License"],
    ["Govt Issued ID", "Govt Issued ID"],
  ];

  const BUSINESS_TYPE_CHOICES = [
    ["Registered", "Registered"],
    ["Unregistered", "Unregistered"],
  ];

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

  const [businessDataChanges, setBusinessDataChanges] = useState(false);
  const [businessStatusDataChanges, setBusinessStatusDataChanges] =
    useState(false);
  const [businessOwnerDataChanges, setBusinessOwnerDataChanges] =
    useState(false);
  const [bankDataChanges, setBankDataChanges] = useState(false);
  const [bvnDataChanges, setBvnDataChanges] = useState(false);
  const [photoDataChanges, setPhotoDataChanges] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [businessData, setBusinessData] = useState({
    business_address: "",
    business_type: "",
    staff_size: "",
    business_industry: "",
    business_category: "",
    business_description: "",
    business_phone: "",
    business_email: "",
    support_email: "",
    business_website: "",
    country: "",
  });

  const [businessStatusData, setBusinessStatusData] = useState({
    business_name: "",
    business_status: "",
    business_reg_num: "",
    business_reg_cert: "",
  });

  const [businessOwnerData, setBusinessOwnerData] = useState({
    director_name: "",
    id_type: "",
    id_number: "",
    id_card_image: "",
    dob: "",
    address: "",
    proof_of_address: "",
  });

  const [bankData, setBankData] = useState({
    account_name: "",
    bank_account_number: "",
    bank_name: "",
  });

  const [bvnData, setBvnData] = useState({
    bvn: "",
  });

  const [photoData, setPhotoData] = useState({
    photo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value });
    setBusinessDataChanges(true);
  };

  useEffect(() => {
    if (sellerAccount) {
      setBusinessData({
        business_name: sellerAccount?.business_name,
        trading_name: sellerAccount?.trading_name,
        // business_reg_num: sellerAccount?.business_reg_num,
        business_address: sellerAccount?.business_address,
        // business_type: sellerAccount?.business_type,
        staff_size: sellerAccount?.staff_size,
        business_industry: sellerAccount?.business_industry,
        business_category: sellerAccount?.business_category,
        business_description: sellerAccount?.business_description,
        business_phone: sellerAccount?.business_phone,
        business_email: sellerAccount?.business_email,
        support_email: sellerAccount?.support_email,
        business_website: sellerAccount?.business_website,
        country: sellerAccount?.country,
      });
      setBusinessDataChanges(false);
    }
  }, [sellerAccount]);

  const handleBusinessStatusInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setBusinessStatusData({ ...businessStatusData, [name]: files[0] });
    } else {
      setBusinessStatusData({ ...businessStatusData, [name]: value });
    }
    setBusinessStatusDataChanges(true);
  };

  useEffect(() => {
    if (businessStatus) {
      setBusinessStatusData({
        business_name: businessStatus?.business_name,
        business_status: businessStatus?.business_status,
        business_reg_num: businessStatus?.business_reg_num,
        business_reg_cert: businessStatus?.business_reg_cert,
      });
      setBusinessStatusDataChanges(false);
    }
  }, [businessStatus]);

  const handleUpdateBusinessStatus = () => {
    const businessStatusFormData = new FormData();
    businessStatusFormData.append(
      "director_name",
      businessStatusData.director_name
    );
    businessStatusFormData.append(
      "business_name",
      businessStatusData.business_name
    );
    businessStatusFormData.append(
      "business_status",
      businessStatusData.business_status
    );
    businessStatusFormData.append(
      "business_reg_num",
      businessStatusData.business_reg_num
    );

    if (businessStatusData.business_reg_cert instanceof File) {
      businessStatusFormData.append(
        "business_reg_cert",
        businessStatusData.business_reg_cert
      );
    }

    console.log("businessStatusFormData:", businessStatusFormData);

    dispatch(updateBusinessStatus(businessStatusFormData));
  };

  const handleBusinessOwnerInputChange = (e) => {
    const { name, value, files } = e.target;

    // if (name === "dob" && typeof value === "string") {
    //   const parsedDate = parseISO(value);
    //   setBusinessOwnerData({ ...businessOwnerData, [name]: parsedDate });
    // } else 
    if (files) {
      setBusinessOwnerData({ ...businessOwnerData, [name]: files[0] });
    } else {
      setBusinessOwnerData({ ...businessOwnerData, [name]: value });
    }
    setBusinessOwnerDataChanges(true);
  };

  useEffect(() => {
    if (sellerDetails) {
      setBusinessOwnerData({
        director_name: sellerDetails?.director_name,
        id_type: sellerDetails?.id_type,
        id_number: sellerDetails?.id_number,
        id_card_image: sellerDetails?.id_card_image,
        dob: sellerDetails?.dob,
        address: sellerDetails?.address,
        proof_of_address: sellerDetails?.proof_of_address,
      });
      setBusinessOwnerDataChanges(false);
    }
  }, [sellerDetails]);

  const handleUpdateBusinessOwnerDetail = () => {
    const businessOwnerFormData = new FormData();
    businessOwnerFormData.append(
      "director_name",
      businessOwnerData.director_name
    );
    businessOwnerFormData.append("id_type", businessOwnerData.id_type);
    businessOwnerFormData.append("id_number", businessOwnerData.id_number);
    businessOwnerFormData.append("dob", businessOwnerData.dob);
    businessOwnerFormData.append("address", businessOwnerData.address);

    if (businessOwnerData.proof_of_address instanceof File) {
      businessOwnerFormData.append(
        "proof_of_address",
        businessOwnerData.proof_of_address
      );
    }

    if (businessOwnerData.id_card_image instanceof File) {
      businessOwnerFormData.append(
        "id_card_image",
        businessOwnerData.id_card_image
      );
    }

    console.log("proof_of_address:", businessOwnerData.proof_of_address);
    console.log("businessOwnerFormData:", businessOwnerFormData);

    dispatch(updateBusinessOwnerDetails(businessOwnerFormData));
  };

  const handleBankAccountInputChange = (e) => {
    const { name, value } = e.target;
    setBankData({ ...bankData, [name]: value });
    setBankDataChanges(true);
  };

  useEffect(() => {
    if (sellerBankAccount) {
      setBankData({
        account_name: sellerBankAccount?.account_name,
        bank_account_number: sellerBankAccount?.bank_account_number,
        bank_name: sellerBankAccount?.bank_name,
      });
      setBankDataChanges(false);
    }
  }, [sellerBankAccount]);

  const handleBvnInputChange = (e) => {
    const { name, value } = e.target;
    setBvnData({ ...bvnData, [name]: value });
    setBvnDataChanges(true);
  };

  useEffect(() => {
    if (sellerBvn) {
      setBvnData({
        bvn: sellerBvn?.bvn,
      });
      setBvnDataChanges(false);
    }
  }, [sellerBvn]);

  const handlePhotoInputChange = (e) => {
    const file = e.target.files[0];
    setPhotoData({ photo: file });
    setPhotoDataChanges(true);
  };

  useEffect(() => {
    if (sellerPhoto) {
      setPhotoData({
        photo: sellerPhoto?.photo,
      });
      setPhotoDataChanges(false);
    }
  }, [sellerPhoto]);

  const handleUpdatePhoto = () => {
    const photoFormData = new FormData();

    if (photoData.photo instanceof File) {
      photoFormData.append("photo", photoData.photo);
    }

    console.log("photoFormData:", photoFormData);
    console.log("photoData.photo:", photoData.photo);
    console.log("photoData:", photoData);

    dispatch(updateSellerPhoto(photoFormData));
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getBusinessStatus());
      dispatch(getBusinessOwnerDetails());
      dispatch(getBusinessBankAccount());
      dispatch(getBvn());
      dispatch(getSellerPhoto());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    let successMessage = "";

    if (updateSellerAccountSuccess) {
      successMessage = "Seller account updated successfully.";
    } else if (updateBusinessStatusSuccess) {
      successMessage = "Business status updated successfully.";
    } else if (updateBusinessOwnerDetailsSuccess) {
      successMessage = "Business owner details updated successfully.";
    } else if (updateBankAccountSuccess) {
      successMessage = "Business bank account updated successfully.";
    } else if (updateSellerBvnSuccess) {
      successMessage = "BVN updated successfully.";
    } else if (updateSellerPhotoSuccess) {
      successMessage = "Seller photo updated successfully.";
    }

    if (successMessage) {
      setSuccessMessage(successMessage);

      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();
      }, 3000);
    }
  }, [
    updateSellerAccountSuccess,
    updateBusinessStatusSuccess,
    updateBusinessOwnerDetailsSuccess,
    updateBankAccountSuccess,
    updateSellerBvnSuccess,
    updateSellerPhotoSuccess,
  ]);

  const handleUpdateBusinessAccount = () => {
    dispatch(updateSellerAccount(businessData));
  };

  const handleUpdateBusinessBankAccount = () => {
    dispatch(updateBusinessBankAccount(bankData));
  };

  const handleUpdateBvn = () => {
    dispatch(updateBvn(bvnData));
  };

  return (
    <Container Fluid>
      <Row className="d-flex justify-content-center py-2">
        <h2 className="text-center py-2">
          Business Profile <i className="fas fa-user"></i>
        </h2>

        <div className="d-flex justify-content-center text-center py-2">
          {successMessage && (
            <Message variant="success" fixed>
              {successMessage}
            </Message>
          )}

          {getSellerAccountLoading && <Loader />}
          {getSellerAccountError && (
            <Message variant="danger" fixed>
              {getSellerAccountError}
            </Message>
          )}

          {updateSellerAccountLoading && <Loader />}
          {updateSellerAccountError && (
            <Message variant="danger" fixed>
              {updateSellerAccountError}
            </Message>
          )}

          {updateBusinessStatusLoading && <Loader />}
          {updateBusinessStatusError && (
            <Message variant="danger" fixed>
              {updateBusinessStatusError}
            </Message>
          )}

          {updateBusinessOwnerDetailsLoading && <Loader />}
          {updateBusinessOwnerDetailsError && (
            <Message variant="danger" fixed>
              {updateBusinessOwnerDetailsError}
            </Message>
          )}

          {updateBankAccountLoading && <Loader />}
          {updateBankAccountError && (
            <Message variant="danger" fixed>
              {updateBankAccountError}
            </Message>
          )}

          {updateSellerBvnLoading && <Loader />}
          {updateSellerBvnError && (
            <Message variant="danger" fixed>
              {updateSellerBvnError}
            </Message>
          )}

          {updateSellerPhotoLoading && <Loader />}
          {updateSellerPhotoError && (
            <Message variant="danger" fixed>
              {updateSellerPhotoError}
            </Message>
          )}
        </div>
        <p className="d-flex justify-content-end">
          <i> Verified </i>
          {sellerAccount?.is_seller_verified ? (
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "18px", color: "blue" }}
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
              <Accordion.Header>Business Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessData.business_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Trading Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="trading_name"
                      value={businessData.trading_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Business Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_reg_num"
                      value={businessData.business_reg_num}
                      onChange={handleInputChange}
                    />
                  </Form.Group> */}

                  <Form.Group>
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_address"
                      value={businessData.business_address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Business Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_type"
                      value={businessData.business_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Business Status</option>
                      {BUSINESS_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group> */}

                  <Form.Group>
                    <Form.Label>Staff Size</Form.Label>
                    <Form.Control
                      as="select"
                      name="staff_size"
                      value={businessData.staff_size}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Staff Size</option>
                      {STAFF_SIZE_CHOICES.map((size) => (
                        <option key={size[0]} value={size[0]}>
                          {size[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_industry"
                      value={businessData.business_industry}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Business Industry</option>
                      {BUSINESS_INDUSTRY_CHOICES.map((industry) => (
                        <option key={industry[0]} value={industry[0]}>
                          {industry[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_category"
                      value={businessData.business_category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Business Category</option>
                      {BUSINESS_CATEGORY_CHOICES.map((category) => (
                        <option key={category[0]} value={category[0]}>
                          {category[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_description"
                      value={businessData.business_description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_phone"
                      value={businessData.business_phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_email"
                      value={businessData.business_email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Support Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="support_email"
                      value={businessData.support_email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_website"
                      value={businessData.business_website}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={businessData.country}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end py-2">
                    <Button
                      className="rounded"
                      variant="primary"
                      onClick={handleUpdateBusinessAccount}
                      disabled={
                        !businessDataChanges ||
                        updateSellerAccountLoading ||
                        updateSellerAccountSuccess
                      }
                    >
                      <span className="d-flex justify-content-between">
                        {updateSellerAccountLoading && <LoaderButton />}
                        Update Business Account
                      </span>
                    </Button>{" "}
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Business Status</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessStatusData.business_name}
                      onChange={handleBusinessStatusInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_status"
                      value={businessStatusData.business_status}
                      onChange={handleBusinessStatusInputChange}
                    >
                      <option value="">Select Business Status</option>
                      {BUSINESS_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_reg_num"
                      value={businessStatusData.business_reg_num}
                      onChange={handleBusinessStatusInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Certificate</Form.Label>

                    <div className="py-2">
                      {businessStatus?.business_reg_cert && (
                        <img
                          src={businessStatus?.business_reg_cert}
                          alt="Business Reg Cert"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="business_reg_cert"
                      onChange={handleBusinessStatusInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdateBusinessStatus}
                    disabled={
                      !businessStatusDataChanges ||
                      updateBusinessStatusLoading ||
                      updateBusinessStatusSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateBusinessStatusLoading && <LoaderButton />}
                      Update Business Status
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Business Owner Detail</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Director Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessOwnerData.director_name}
                      onChange={handleBusinessStatusInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="id_type"
                      value={businessOwnerData.id_type}
                      onChange={handleBusinessOwnerInputChange}
                    >
                      <option value="">ID Type</option>
                      {ID_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="id_number"
                      value={businessOwnerData.id_number}
                      onChange={handleBusinessOwnerInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>ID Card Image</Form.Label>

                    <div className="py-2">
                      {sellerDetails?.id_card_image && (
                        <img
                          src={sellerDetails?.id_card_image}
                          alt="ID Card "
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="id_card_image"
                      onChange={handleBusinessOwnerInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="dob"
                      value={businessOwnerData.dob}
                      onChange={handleBusinessOwnerInputChange}
                    /> */}
                    <div>
                      <DatePicker
                        selected={
                          businessOwnerData.dob ? new Date(businessOwnerData.dob) : null
                        }
                        onChange={(date) =>
                          handleBusinessOwnerInputChange({
                            target: { name: "dob", value: date },
                          })
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableMonthYearDropdown
                        className="rounded py-2 mb-2 form-control"
                        placeholderText="Select date of birth"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={businessOwnerData.address}
                      onChange={handleBusinessOwnerInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Proof Of Address</Form.Label>

                    <div className="py-2">
                      {sellerDetails?.proof_of_address && (
                        <img
                          src={sellerDetails?.proof_of_address}
                          alt="Proof of Address"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="proof_of_address"
                      onChange={handleBusinessOwnerInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdateBusinessOwnerDetail}
                    disabled={
                      !businessOwnerDataChanges ||
                      updateBusinessOwnerDetailsLoading ||
                      updateBusinessOwnerDetailsSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateBusinessOwnerDetailsLoading && <LoaderButton />}
                      Update Business Owner Detail
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Business Bank Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="account_name"
                      value={bankData.account_name}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_account_number"
                      value={bankData.bank_account_number}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_name"
                      value={bankData.bank_name}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdateBusinessBankAccount}
                    disabled={
                      !bankDataChanges ||
                      updateBankAccountLoading ||
                      updateBankAccountSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateBankAccountLoading && <LoaderButton />}
                      Update Business Bank Account
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>USD Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="account_name"
                      value={bankData.account_name}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_account_number"
                      value={bankData.bank_account_number}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bank_name"
                      value={bankData.bank_name}
                      onChange={handleBankAccountInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdateBusinessBankAccount}
                    disabled={
                      !bankDataChanges ||
                      updateBankAccountLoading ||
                      updateBankAccountSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateBankAccountLoading && <LoaderButton />}
                      Update USD Account
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Bank Verification Number</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>BVN</Form.Label>
                    <Form.Control
                      type="text"
                      name="bvn"
                      value={bvnData.bvn}
                      onChange={handleBvnInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdateBvn}
                    disabled={
                      !bvnDataChanges ||
                      updateSellerBvnLoading ||
                      updateSellerBvnSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateSellerBvnLoading && <LoaderButton />}
                      Update BVN
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Seller Photo</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    {/* <Form.Label>Seller Photo</Form.Label> */}
                    <div className="py-2">
                      {sellerPhoto?.photo && (
                        <img
                          src={sellerPhoto.photo}
                          alt="Seller"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>

                    <Form.Control
                      type="file"
                      name="photo"
                      onChange={handlePhotoInputChange}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdatePhoto}
                    disabled={
                      !photoDataChanges ||
                      updateSellerPhotoLoading ||
                      updateSellerPhotoSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateSellerPhotoLoading && <LoaderButton />}
                      Update Photo
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerProfile;
