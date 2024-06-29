// SellerBankAccount.js
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
import { sellerBankAccount } from "../../redux/actions/sellerActions";
import Message from "../../Message";
import Loader from "../../Loader";

const SellerBankAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const sellerBankAccountState = useSelector(
    (state) => state.sellerBankAccountState
  );
  const { success, error, loading } = sellerBankAccountState;

  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");

  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountNumberError, setBankAccountNumberError] = useState("");

  const [accountName, setBankAccountName] = useState("");
  const [accountNameError, setBankAccountNameError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "bankName":
        setBankName(value);
        setBankNameError("");
        break;

      case "bankAccountNumber":
        setBankAccountNumber(value);
        setBankAccountNumberError("");
        break;

      case "accountName":
        setBankAccountName(value);
        setBankAccountNameError("");
        break;

      default:
        break;
    }
  };

  const sellerData = {
    bank_name: bankName,
    account_name: accountName,
    bank_account_number: bankAccountNumber,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Seller BVN");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const handleSellerBankAccount = (e) => {
    e.preventDefault();

    if (!bankName) {
      setBankNameError("Please enter the bank name.");
    } else {
      setBankNameError("");
    }

    if (!bankAccountNumber) {
      setBankAccountNumberError("Please enter the account bank number.");
    } else {
      setBankAccountNumberError("");
    }

    if (!accountName) {
      setBankAccountNameError("Please enter the account name.");
    } else {
      setBankAccountNameError("");
    }

    if (!bankName || !bankAccountNumber || !accountName) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setFormError("");
      dispatch(sellerBankAccount(sellerData));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Seller Bank Account</Text>
      {loading && <Loader />}

      {success && (
        <Message variant="success">Form submitted successfully.</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bank Account Name</Text>
        <TextInput
          style={styles.input}
          value={accountName}
          onChangeText={(value) => handleFieldChange("accountName", value)}
          placeholder="Enter account name"
        />
        {accountNameError ? (
          <Text style={styles.error}>{accountNameError}</Text>
        ) : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bank Account Number</Text>
        <TextInput
          style={styles.input}
          value={bankAccountNumber}
          onChangeText={(value) =>
            handleFieldChange("bankAccountNumber", value)
          }
          placeholder="Enter account number"
          keyboardType="numeric"
        />
        {bankAccountNumberError ? (
          <Text style={styles.error}>{bankAccountNumberError}</Text>
        ) : null}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={(value) => handleFieldChange("bankName", value)}
          placeholder="Enter bank name"
        />
        {bankNameError ? (
          <Text style={styles.error}>{bankNameError}</Text>
        ) : null}
      </View>

      {formError ? <Text style={styles.formError}>{formError}</Text> : null}

      <Button
        title="Continue"
        onPress={handleSellerBankAccount}
        disabled={loading || success}
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

export default SellerBankAccount;
