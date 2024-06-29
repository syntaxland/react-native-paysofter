// CardPaymentUsd.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-paper";
import {
  fundUserUsdAccount,
  resetFundUserUsdAccount,
} from "../../redux/actions/AccountFundActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "../../FormatAmount";
import { MONTH_CHOICES, YEAR_CHOICES } from "./payment-constants";

const CardPaymentUsd = ({ amount, currency, userEmail }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [monthChoices, setMonthChoices] = useState([]);
  const [yearChoices, setYearChoices] = useState([]);

  useEffect(() => {
    setMonthChoices(MONTH_CHOICES);
    setYearChoices(YEAR_CHOICES);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const createdAt = new Date().toISOString();

  const fundUsdAccountState = useSelector((state) => state.fundUsdAccountState);
  const { loading, success, error } = fundUsdAccountState;

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const handlePaymentDetailsChange = (name, value) => {
    let detectedCardType = "";
    if (name === "cardNumber") {
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      paymentDetails.cardNumber &&
      paymentDetails.expirationMonth &&
      paymentDetails.expirationYear &&
      paymentDetails.cvv
    );
  };

  const submitHandler = () => {
    const fundData = {
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,
      card_number: paymentDetails.cardNumber,
      expiration_month: paymentDetails.expirationMonth,
      expiration_year: paymentDetails.expirationYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(fundUserUsdAccount(fundData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetFundUserUsdAccount());
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation, dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.cardContainer}> */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>Debit Card ({currency})</Text>
            {success && (
              <Message variant="success">Payment made successfully.</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={paymentDetails.cardNumber}
                onChangeText={(value) =>
                  handlePaymentDetailsChange("cardNumber", value)
                }
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={16}
              />
              {cardType ? <Text>Detected Card Type: {cardType}</Text> : null}
            </View>

            <View style={styles.spaceBtwGroup}>
              <Text style={styles.label}>Expiration Month</Text>
              <View style={styles.dateContainer}>
                <Picker
                  selectedValue={paymentDetails.expirationMonth}
                  style={styles.picker}
                  onValueChange={(value) =>
                    handlePaymentDetailsChange("expirationMonth", value)
                  }
                >
                  <Picker.Item label="Select Month" value="" />
                  {monthChoices.map(([value, label]) => (
                    <Picker.Item key={value} label={label} value={value} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Expiration Year</Text>
              <View style={styles.dateContainer}>
                <Picker
                  selectedValue={paymentDetails.expirationYear}
                  style={styles.picker}
                  onValueChange={(value) =>
                    handlePaymentDetailsChange("expirationYear", value)
                  }
                >
                  <Picker.Item label="Select Year" value="" />
                  {yearChoices.map(([value, label]) => (
                    <Picker.Item key={value} label={label} value={value} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={paymentDetails.cvv}
                onChangeText={(value) =>
                  handlePaymentDetailsChange("cvv", value)
                }
                placeholder="123"
                secureTextEntry
                maxLength={3}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={submitHandler}
              disabled={!isFormValid()}
            >
              <Text style={styles.buttonText}>
                Pay ({formatAmount(amount)} {currency})
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    // backgroundColor: "white",
    // flex: 1,
  },
  // header: {
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   marginBottom: 20,
  // },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  spaceBtwGroup: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingVertical: 2,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  icon: {
    marginLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardContainer: {
    padding: 2,
  },
});

export default CardPaymentUsd;
