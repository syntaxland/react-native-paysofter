// BusinessOwnerDetail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { businessOwnerDetail } from "../../redux/actions/sellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const BusinessOwnerDetail = ({ navigation }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

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

  const [idCardImage, setIdCardImage] = useState(null);
  const [idCardImageError, setIdCardImageError] = useState("");

  const [dob, setDob] = useState(new Date());
  const [dobError, setDobError] = useState("");
  const [showDobPicker, setShowDobPicker] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [proofOfAddress, setProofOfAddress] = useState(null);
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
    ["Intl Passport", "Intl Passport"],
    ["Driving License", "Driving License"],
    ["Govt Issued ID", "Govt Issued ID"],
  ];

  const handleImagePick = async (fieldName) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleFieldChange(fieldName, result.uri);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Seller Bank");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const handleBusinessOwnerDetail = (e) => {
    e.preventDefault();

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
      setIdNumberError("Please enter the ID number.");
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
      const sellerData = new FormData();
      sellerData.append("director_name", directorName);
      sellerData.append("id_type", idType);
      sellerData.append("id_number", idNumber);
      sellerData.append("id_card_image", {
        uri: idCardImage,
        type: "image/jpeg",
        name: "idCardImage.jpg",
      });
      sellerData.append("dob", dob.toISOString());
      sellerData.append("address", address);
      sellerData.append("proof_of_address", {
        uri: proofOfAddress,
        type: "image/jpeg",
        name: "proofOfAddress.jpg",
      });

      dispatch(businessOwnerDetail(sellerData));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Business Owner(s) Details</Text>
      {loading && <Loader />}

      {success && (
        <Message variant="success">Form submitted successfully.</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Director Name</Text>
        <TextInput
          style={styles.input}
          value={directorName}
          onChangeText={(value) => handleFieldChange("directorName", value)}
          placeholder="Enter the director name"
        />
        {directorNameError ? (
          <Text style={styles.error}>{directorNameError}</Text>
        ) : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Type</Text>
        <Picker
          selectedValue={idType}
          onValueChange={(value) => handleFieldChange("idType", value)}
          style={styles.picker}
        >
          <Picker.Item label="ID Type" value="" />
          {ID_TYPE_CHOICES.map((type) => (
            <Picker.Item key={type[0]} label={type[1]} value={type[0]} />
          ))}
        </Picker>
        {idTypeError ? <Text style={styles.error}>{idTypeError}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={styles.input}
          value={idNumber}
          onChangeText={(value) => handleFieldChange("idNumber", value)}
          placeholder="Enter ID Number"
        />
        {idNumberError ? (
          <Text style={styles.error}>{idNumberError}</Text>
        ) : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Card Photo</Text>
        <TouchableOpacity onPress={() => handleImagePick("idCardImage")}>
          <Text style={styles.imagePicker}>Upload ID Card Photo</Text>
        </TouchableOpacity>
        {idCardImage && (
          <Image source={{ uri: idCardImage }} style={styles.imagePreview} />
        )}
        {idCardImageError ? (
          <Text style={styles.error}>{idCardImageError}</Text>
        ) : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date Of Birth</Text>
        <TouchableOpacity onPress={() => setShowDobPicker(true)}>
          <Text style={styles.datePicker}>
            {dob ? dob.toDateString() : "Select Date of Birth"}
          </Text>
        </TouchableOpacity>
        {showDobPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || dob;
              setShowDobPicker(Platform.OS === "ios");
              handleFieldChange("dob", currentDate);
            }}
          />
        )}
        {dobError ? <Text style={styles.error}>{dobError}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Home Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(value) => handleFieldChange("address", value)}
          placeholder="Enter your home address"
        />
        {addressError ? <Text style={styles.error}>{addressError}</Text> : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Proof of Address</Text>
        <TouchableOpacity onPress={() => handleImagePick("proofOfAddress")}>
          <Text style={styles.imagePicker}>Upload Proof of Address</Text>
        </TouchableOpacity>
        {proofOfAddress && (
          <Image source={{ uri: proofOfAddress }} style={styles.imagePreview} />
        )}
        {proofOfAddressError ? (
          <Text style={styles.error}>{proofOfAddressError}</Text>
        ) : null}
      </View>

      {formError ? <Text style={styles.formError}>{formError}</Text> : null}

      <Button
        onPress={handleBusinessOwnerDetail}
        title="Submit"
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
  },
  imagePicker: {
    color: "blue",
    textDecorationLine: "underline",
  },
  datePicker: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  formError: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default BusinessOwnerDetail;
