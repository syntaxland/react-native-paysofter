// FundUsdAccount.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-paper";
import Loader from "../../Loader";
import Message from "../../Message";
import PaymentScreen from "./PaymentScreen";

const CURRENCY_CHOICES = [{ label: "USD", value: "USD" }];

const FundUsdAccount = ({ onClose }) => {
  const fundUsdAccountState = useSelector((state) => state.fundUsdAccountState);
  const { loading, error } = fundUsdAccountState;

  const [message, setMessage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [showFundAccountButton, setShowFundAccountButton] = useState(false);

  const submitHandler = () => {
    if (amount >= 1) {
      setShowFundAccountButton(true);
      // onClose();
    } else {
      setMessage("Minimum amount is 1 USD.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Fund USD Account</Text>

            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <View style={styles.formGroup}>
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
            </View>

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
              <Button title="Submit" onPress={submitHandler} color="#007bff" />
            </View>
          </View>

          {showFundAccountButton && (
            <PaymentScreen amount={amount} currency={currency} />
          )}
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
    padding: 2,
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

export default FundUsdAccount;
