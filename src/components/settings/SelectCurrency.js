// SelectCurrency.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearchDollar } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-paper";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  selecteCurrency,
  resetSelectCurrencytState,
} from "../../redux/actions/settingsActions";
import Loader from "../../Loader";
import Message from "../../Message";
import GetNgnAccountFundBalance from "../FundAccount/GetNgnAccountFundBalance";
import GetUsdAccountFundBalance from "../FundAccount/GetUsdAccountFundBalance";

const CURRENCY_CHOICES = [
  { label: "USD", value: "USD" },
  { label: "NGN", value: "NGN" },
];

const SelectCurrency = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile, loading: profileLoading, error: profileError } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const selecteCurrencyState = useSelector(
    (state) => state.selecteCurrencyState
  );
  const { loading, success, error } = selecteCurrencyState;

  const [currency, setCurrency] = useState(profile?.selected_currency || "");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const selectedCurrency = currency;
  // const selectedCurrency = profile?.selected_currency;
  console.log("selectedCurrency:", selectedCurrency);

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(getUserProfile());
    }
  }, [userInfo, navigation, dispatch]);

  useEffect(() => {
    if (profile && profile.selected_currency) {
      setCurrency(profile.selected_currency);
    }
  }, [profile]);

  const handleCurrencyChange = (value) => {
    if (value !== currency) {
      setCurrency(value);
      const currencyData = {
        currency: value,
      };
      dispatch(selecteCurrency(currencyData));
    }
  };

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetSelectCurrencytState());
        // navigation.navigate("Dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.header}>
                <FontAwesomeIcon icon={faSearchDollar} />{" "}
                <Text>Selected Currency</Text>
              </Text>
              {(loading || profileLoading) && <Loader />}
              {(error || profileError) && (
                <Message variant="danger">{error || profileError}</Message>
              )}
              {showSuccessMessage && (
                <Message variant="success">
                  {currency} selected successfully.
                </Message>
              )}

              <View style={styles.selectContainer}>
                <Picker
                  selectedValue={currency}
                  onValueChange={handleCurrencyChange}
                  style={{ height: 50, width: "100%" }}
                >
                  <Picker.Item label="Select Currency" value={null} />
                  {CURRENCY_CHOICES.map((choice) => (
                    <Picker.Item
                      key={choice.value}
                      label={choice.label}
                      value={choice.value}
                    />
                  ))}
                </Picker>
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.accountBalance}>
              {selectedCurrency === "NGN" && <GetNgnAccountFundBalance />}
              {selectedCurrency === "USD" && <GetUsdAccountFundBalance />}
            </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  currencyContainer: {
    padding: 2,
  },
  selectContainer: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardContainer: {
    padding: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default SelectCurrency;
