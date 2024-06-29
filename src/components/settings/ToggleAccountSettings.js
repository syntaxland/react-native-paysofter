// ToggleAccountSettings.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLock,
  faLockOpen,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserAccountFundBalance } from "../../redux/actions/AccountFundActions";
import {
  toggleAccountFund,
  resetToggleAccountFundState,
} from "../../redux/actions/AccountFundActions";
import Message from "../../Message";
import Loader from "../../Loader";

const ToggleAccountSettings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleAccountFundState = useSelector(
    (state) => state.toggleAccountFundState
  );
  const { success, error, loading } = toggleAccountFundState;

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetToggleAccountFundState());
        navigation.navigate("Home");
      }, 3000);
    }
  }, [success]);

  const handleFundAccountToggle = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }
    const toggleData = {
      password: password,
    };
    dispatch(toggleAccountFund(toggleData));
  };

  useEffect(() => {
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && (
        <Message variant="success">
          Account Fund status toggled successfully.
        </Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      <View style={styles.statusContainer}>
        <Text style={styles.status}>
          Status:{" "}
          <Text>
            {accountFundBalance?.is_diabled ? (
              <TouchableOpacity>
                <Text>
                  {" "}
                  <FontAwesomeIcon icon={faLock} size={16} color="red" />{" "}
                  Disabled
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity>
                  {accountFundBalance?.is_active ? (
                    <>
                      <Text>
                        {" "}
                        <FontAwesomeIcon
                          icon={faLockOpen}
                          size={16}
                          color="green"
                        />{" "}
                        Active
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text>
                        {" "}
                        <FontAwesomeIcon
                          icon={faLock}
                          size={16}
                          color="#ffc107"
                        />{" "}
                        Locked
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Text>
        </Text>
      </View>
      <Text style={styles.warningContainer}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size={16}
          color="#ffc107"
          style={styles.icon} 
        />{" "}
        <Text style={styles.warningText}>
          Warning! This action will block or enable all transaction withdrawals 
          from this account. Enter password for your account email{" "}
          <Text style={styles.emailText}>{userInfo.email}</Text>:
        </Text>
      </Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        style={styles.input}
        secureTextEntry={true}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <View style={styles.submitBtn}>
        <TouchableOpacity onPress={handleFundAccountToggle} disabled={loading}>
          <Text style={styles.roundedSuccessBtn}>
            Toggle Account Fund Status
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  statusContainer: {
    marginBottom: 10,
  },
  status: {
    marginBottom: 10,
  },
  disabledText: {
    color: "red",
  },
  enabledText: {
    color: "green",
  },
  warningContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  warningText: {
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  roundedSuccessBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  submitBtn: {
    padding: 10,
  },
  icon: {
    marginRight: 20,
  },
});

export default ToggleAccountSettings;
