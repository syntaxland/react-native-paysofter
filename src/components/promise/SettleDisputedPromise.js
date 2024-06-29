// SettleDisputedPromise.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import {
  settleDisputedPromise,
  resetSettleDisputedPromiseState,
} from "../../redux/actions/PromiseActions";
import Message from "../../Message";
import Loader from "../../Loader";

const SettleDisputedPromise = ({ promiseId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const settleDisputedPromiseState = useSelector(
    (state) => state.settleDisputedPromiseState
  );
  const { success, error, loading } = settleDisputedPromiseState;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetSettleDisputedPromiseState());
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const promiseData = {
    promise_id: promiseId,
    keyword: keyword,
  };

  const handleSettleDisputedPromise = () => {
    dispatch(settleDisputedPromise(promiseData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">
          Conflict resolution activated successfully.
        </Message>
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
        Warning! This action will open a support ticket for this Promise ID to
        resolve whatever conflict arising from this promise order fulfilment.
        Note that 2% of the promise amount will be charged for the service. Type{" "}
        <Text style={styles.italicText}>confirm</Text> to activate.
      </Text>

      <TextInput
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        placeholder="confirm"
        style={styles.input}
        required
        maxLength={8}
      />

      <TouchableOpacity
        onPress={handleSettleDisputedPromise}
        disabled={keyword.toLowerCase() !== "confirm"}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Activate Resolve Conflict</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  warningText: {
    marginBottom: 20,
    textAlign: "center",
  },
  warningIcon: {
    color: "#ffc107",
  },
  italicText: {
    fontStyle: "italic",
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
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SettleDisputedPromise;
