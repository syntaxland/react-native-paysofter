// CreateBusinessStatus.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { createBusinessStatus } from "../../redux/actions/sellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { BUSINESS_TYPE_CHOICES } from "../../constants";

function CreateBusinessStatus({ navigation }) {
  const dispatch = useDispatch();

  const [businessTypeChoices, setBusinessTypeChoices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setBusinessTypeChoices(BUSINESS_TYPE_CHOICES);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

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

  const [businessRegCert, setBusinessRegCert] = useState(null);
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

  const pickImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const file = {
        uri: uri,
        name: uri.split("/").pop(),
        type: `image/${uri.split(".").pop()}`,
      };
      setBusinessRegCert(file);
      setBusinessRegCertError("");
    }
  };

  const sellerData = new FormData();
  sellerData.append("business_name", businessName);
  sellerData.append("business_status", businessStatus);
  sellerData.append("business_reg_num", businessRegNum);
  if (businessRegCert) sellerData.append("business_reg_cert", businessRegCert);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Business Details");
        onRefresh();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    setBusinessName("");
    setBusinessStatus("");
    setBusinessRegNum("");
    setBusinessRegCert(null);
    setFormError("");
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleCreateBusinessStatus = (e) => {
    e.preventDefault();

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

    if (!businessName || !businessStatus) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(createBusinessStatus(sellerData));
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Business Status</Text>
        {loading && <Loader />}
        {success && (
          <Message variant="success">Form submitted successfully.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={(text) => handleFieldChange("businessName", text)}
            placeholder="Enter the Business Name"
            maxLength={100}
          />
          {businessNameError && (
            <Text style={styles.errorText}>{businessNameError}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Business Status</Text>
          <Picker
            selectedValue={businessStatus}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleFieldChange("businessStatus", itemValue)
            }
          >
            <Picker.Item label="Select Business Status" value="" />
            {businessTypeChoices.map((type) => (
              <Picker.Item key={type[0]} label={type[1]} value={type[0]} />
            ))}
          </Picker>
          {businessStatusError && (
            <Text style={styles.errorText}>{businessStatusError}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Business Registration Number</Text>
          <TextInput
            style={styles.input}
            value={businessRegNum}
            onChangeText={(text) => handleFieldChange("businessRegNum", text)}
            placeholder="Enter Business Registration Number"
            maxLength={100}
          />
          {businessRegNumError && (
            <Text style={styles.errorText}>{businessRegNumError}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Business Registration Certificate</Text>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => pickImage(true)}
          >
            <Text style={styles.uploadText}>
              {businessRegCert ? "Change Certificate" : "Select Certificate"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => pickImage(false)}
          >
            <Text style={styles.uploadText}>Capture Certificate</Text>
          </TouchableOpacity>
          {businessRegCert && (
            <>
              <Image
                source={{ uri: businessRegCert.uri }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setBusinessRegCert(null)}
              >
                <Text style={styles.removeButtonText}>Remove Certificate</Text>
              </TouchableOpacity>
            </>
          )}
          {businessRegCertError && (
            <Text style={styles.errorText}>{businessRegCertError}</Text>
          )}
        </View>
        {formError && <Text style={styles.errorText}>{formError}</Text>}
        <View style={styles.formGroup}>
          <Button
            title="Continue"
            onPress={handleCreateBusinessStatus}
            disabled={loading || success}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  imagePicker: {
    marginBottom: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  uploadText: {
    color: "#fff",
    textAlign: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default CreateBusinessStatus;
