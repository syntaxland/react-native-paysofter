// SellerConfirmPromise.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { sellerConfirmPromise } from "../../redux/actions/PromiseActions";
import { useNavigation } from "@react-navigation/native";
import Message from "../../Message";
import Loader from "../../Loader";

const SellerConfirmPromise = ({ promiseId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const sellerConfirmPromiseState = useSelector(
    (state) => state.sellerConfirmPromiseState
  );
  const { success, error, loading } = sellerConfirmPromiseState;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  const promiseData = {
    promise_id: promiseId,
  };

  const handleSellerConfirmPromise = () => {
    dispatch(sellerConfirmPromise(promiseData));
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
        Warning! This action will confirm that you have fulfilled the promise
        condition of this buyer.
      </Text>
      <TouchableOpacity
        onPress={handleSellerConfirmPromise}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Confirm Promise</Text>
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

export default SellerConfirmPromise;
