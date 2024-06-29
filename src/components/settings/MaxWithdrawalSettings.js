// MaxWithdrawalSettings.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  setMaxWithdrawal,
  getUserAccountFundBalance,
} from "../../redux/actions/AccountFundActions";
import Loader from "../../Loader";
import Message from "../../Message";

const MaxWithdrawalSettings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const setMaxFundState = useSelector((state) => state.setMaxFundState);
  const { loading, success, error } = setMaxFundState;

  const [amount, setAmount] = useState(accountFundBalance?.max_withdrawal);

  const submitHandler = () => {
    const amountData = {
      amount: amount,
    };

    dispatch(setMaxWithdrawal(amountData));
  };

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);
    }
  }, [success, navigation]);

  useEffect(() => {
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">
            Maximum withdrawal amount limit of {amount} set successfully.
          </Message>
        )}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>
          <Picker
            selectedValue={amount}
            onValueChange={(itemValue) => setAmount(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Less than 10,000 NGN" value="10000" />
            <Picker.Item label="Less than 100,000 NGN" value="100000" />
            <Picker.Item label="Less than 500,000 NGN" value="500000" />
            <Picker.Item label="Less than 1,000,000 NGN" value="1000000" />
            <Picker.Item label="Less than 2,000,000 NGN" value="2000000" />
            <Picker.Item label="Less than 3,000,000 NGN" value="3000000" />
            <Picker.Item label="Less than 5,000,000 NGN" value="5000000" />
            <Picker.Item label="More than 10,000,000 NGN" value="10000000" />
          </Picker>
        </View>

        <View style={styles.submitBtn}>
          <TouchableOpacity
            onPress={submitHandler}
            disabled={loading || success}
          >
            <Text style={styles.roundedPrimaryBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 400,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  submitBtn: {
    marginTop: 20,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default MaxWithdrawalSettings;
