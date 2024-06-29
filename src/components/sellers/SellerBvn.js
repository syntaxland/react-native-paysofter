// SellerBvn.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { sellerBvn } from "../../redux/actions/sellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { useNavigation } from "@react-navigation/native";

const SellerBvn = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const sellerBvnState = useSelector((state) => state.sellerBvnState);
  const { success, error, loading } = sellerBvnState;

  const [bvn, setBvn] = useState("");
  const [bvnError, setBvnError] = useState("");
  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "bvn":
        setBvn(value);
        setBvnError("");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Seller Photo");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const handleSellerBvn = (e) => {
    e.preventDefault();

    if (!bvn) {
      setBvnError("Please enter the bank verification number.");
    } else {
      setBvnError("");
    }

    if (!bvn) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setFormError("");
      dispatch(sellerBvn({ bvn }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.heading}>Seller Bank Verification Number</Text>
        {loading && <Loader />}
        {success && (
          <Message variant="success">Form submitted successfully.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bank Verification Number</Text>
          <TextInput
            style={styles.input}
            value={bvn}
            onChangeText={(value) => handleFieldChange("bvn", value)}
            placeholder="Enter your bank verification number"
            keyboardType="numeric"
            maxLength={10}
          />
          {bvnError ? <Text style={styles.error}>{bvnError}</Text> : null}
        </View>

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <Button
          title="Continue"
          onPress={handleSellerBvn}
          disabled={loading || success}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
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
  button: {
    marginTop: 20,
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

export default SellerBvn;
