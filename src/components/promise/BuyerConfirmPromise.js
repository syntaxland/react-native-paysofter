// BuyerConfirmPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  buyerConfirmPromise,
  resetBuyerConfirmPromiseState,
} from "../../redux/actions/PromiseActions";
import { createTransaction } from "../../redux/actions/transactionActions";
import Message from "../../Message";
import Loader from "../../Loader";

const BuyerConfirmPromise = ({ promiseId, amount }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const buyerConfirmPromiseState = useSelector(
    (state) => state.buyerConfirmPromiseState
  );
  const { success, error, loading } = buyerConfirmPromiseState;

  const [password, setPassword] = useState("");
  const createdAt = new Date().toISOString();

  const transactionData = {
    payment_id: promiseId,
    amount: amount,
    created_at: createdAt,
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(createTransaction(transactionData));
        dispatch(resetBuyerConfirmPromiseState());
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success]);

  const promiseData = {
    password: password,
    promise_id: promiseId,
  };

  const handleBuyerConfirmPromise = () => {
    dispatch(buyerConfirmPromise(promiseData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">Promise confirmed successfully.</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      <Text style={styles.warningText}>
        <Text style={styles.warningIcon}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size={16}
            color="#ffc107"
          />
        </Text>{" "}
        Warning! This action will confirm that your promise order from this
        seller is fulfilled and will transfer the promise amount from your
        account to the seller's. Please enter the password for your account
        email <Text style={styles.emailText}>{userInfo.email}</Text>:
      </Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={handleBuyerConfirmPromise}
        disabled={password === "" || loading || success}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  warningText: {
    marginBottom: 20,
    textAlign: "center",
  },
  warningIcon: {
    color: "#ffc107",
  },
  emailText: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BuyerConfirmPromise;
