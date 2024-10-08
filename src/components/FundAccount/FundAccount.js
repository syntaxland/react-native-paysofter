// FundAccount.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";
// import { Picker } from "@react-native-picker/picker";
import Loader from "../../Loader";
import Message from "../../Message";
import PaymentScreen from "./PaymentScreen";
// import GetNgnAccountFundBalance from "./GetNgnAccountFundBalance";

// const CURRENCY_CHOICES = [{ label: "NGN", value: "NGN" }];

const FundAccount = ({ currency }) => {
  const fundAccountState = useSelector((state) => state.fundAccountState);
  const { loading, error } = fundAccountState;

  const [message, setMessage] = useState("");
  // const [currency, setCurrency] = useState("NGN");
  const [amount, setAmount] = useState(0);
  // const [showFundAccountButton, setShowFundAccountButton] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const MINIMUM_AMOUNTS = {
    NGN: 100,
    USD: 1,
    // other currencies
  };
  const minAmount = MINIMUM_AMOUNTS[currency] || 0;

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount >= minAmount) {
      // setShowFundAccountButton(true);
      setShowPaymentPage(true);
    } else {
      setMessage(`Minimum amount is ${minAmount} ${currency}.`);
    }
  };

  // const submitHandler = () => {
  //   if (amount >= 100) {
  //     setShowFundAccountButton(true);
  //     // onClose();
  //   } else {
  //     setMessage("Minimum amount is 100 NGN.");
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {!showPaymentPage && (
            <View style={styles.formContainer}>
              <Text style={styles.header}>Fund NGN Account</Text>

              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}

              {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Currency</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={currency}
                  onValueChange={(itemValue) => setCurrency(itemValue)}
                  style={styles.picker}
                >
                  {CURRENCY_CHOICES.map((choice) => (
                    <Picker.Item
                      key={choice.value}
                      label={choice.label}
                      value={choice.value}
                    />
                  ))}
                </Picker>
              </View>
            </View> */}

              <View style={styles.formGroup}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  value={amount.toString()}
                  onChangeText={(text) => setAmount(Number(text))}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Submit"
                  onPress={submitHandler}
                  color="#007bff"
                />
              </View>
            </View>
          )}

          {showPaymentPage && (
            <PaymentScreen amount={amount} currency={currency} />
          )}

          {/* {showFundAccountButton && (
            <PaymentScreen amount={amount} currency={currency} />
          )} */}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default FundAccount;
