// SelectCurrency.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { selecteCurrency } from "../../redux/actions/settingsActions";
import Loader from "../../Loader";
import Message from "../../Message"; 
import RNPickerSelect from "react-native-picker-select";
 
const CURRENCY_CHOICES = [
  { label: "USD", value: "USD" },
  { label: "NGN", value: "NGN" },
];

const SelectCurrency = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currency, setCurrency] = useState("");

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (!profile) {
      setLoading(true);
      setError("");
      setSuccess(false);
      dispatch(getUserProfile())
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [dispatch, profile]);

  const handleCurrencyChange = (value) => {
    setCurrency(value);
    setSuccess(false);

    const currencyData = {
      currency: value,
    };
    dispatch(selecteCurrency(currencyData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">
          {currency} selected successfully.
        </Message>
      )}
      <RNPickerSelect
        placeholder={{ label: "Select Currency", value: null }}
        items={CURRENCY_CHOICES}
        value={currency}
        onValueChange={handleCurrencyChange}
        // style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
