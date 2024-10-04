// GetNgnAccountFundBalance.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLock,
  faLockOpen,
  faEye,
  faEyeSlash,
  faWallet,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getUserAccountFundBalance } from "../../redux/actions/AccountFundActions";
import ToggleAccountSettings from "../settings/ToggleAccountSettings";
import FundAccount from "./FundAccount";
// import PaymentScreen from "./PaymentScreen";
import { formatAmount } from "../../FormatAmount";
import Message from "../../Message";
import Loader from "../../Loader";

const GetNgnAccountFundBalance = ({ currency }) => {
  const dispatch = useDispatch();

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { loading, error, accountFundBalance } = userAccountBalanceState;
  console.log("NGN accountFundBalance:", accountFundBalance);

  const [showToggleAccountSettings, setShowToggleAccountSettings] =
    useState(false);
  const [showDisableAccountSettings, setShowDisableAccountSettings] =
    useState(false);
  const [showFundAccount, setShowFundAccount] = useState(false);
  const [accountFundVisible, setAccountFundVisible] = useState(false);

  const toggleAccountFundVisible = () => {
    setAccountFundVisible(!accountFundVisible);
  };

  useEffect(() => {
    dispatch(getUserAccountFundBalance());
  }, [dispatch]);

  // const handleFundAccountClose = () => {
  //   setShowFundAccount(false);
  // };

  return (
    <View style={styles.container}>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <View>
        <Text style={styles.heading}>
          <Text style={styles.walletIcon}>
            <FontAwesomeIcon
              icon={faWallet}
              size={18}
              // color={styles.iconColor.color}
            />
          </Text>{" "}
          Account Fund Wallet ({currency})
        </Text>
        <Text style={styles.status}>
          Status:{" "}
          <Text>
            {accountFundBalance?.is_diabled ? (
              <TouchableOpacity
                style={styles.toggleVisibilityButton}
                onPress={() => setShowDisableAccountSettings(true)}
              >
                <Text>
                  {" "}
                  <FontAwesomeIcon icon={faLock} size={16} color="red" />{" "}
                  Disabled
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.toggleVisibilityButton}
                  onPress={() => setShowToggleAccountSettings(true)}
                >
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

        <View style={styles.spaceBtwGroup}>
          <Text style={styles.balance}>
            Balance:{" "}
            {accountFundVisible
              ? formatAmount(accountFundBalance?.balance) + " NGN"
              : "******** NGN"}
          </Text>

          <TouchableOpacity
            style={styles.toggleVisibilityButton}
            onPress={toggleAccountFundVisible}
          >
            <Text>
              {accountFundVisible ? (
                <Text>
                  {" "}
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    size={24}
                    // color={styles.iconColor.color}
                  />{" "}
                  Hide
                </Text>
              ) : (
                <Text>
                  {" "}
                  <FontAwesomeIcon
                    icon={faEye}
                    size={24}
                    // color={styles.iconColor.color}
                  />{" "}
                  Show
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fundAccountBtn}>
          <TouchableOpacity onPress={() => setShowFundAccount(true)}>
            <Text style={styles.roundedPrimaryBtn}>
              Fund {currency} Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showFundAccount} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.spaceBtwGroup}>
              <Text style={styles.modalHeading}>Fund Account ({currency})</Text>
            </View>

            <Text style={styles.closeBtn}>
              <TouchableOpacity onPress={() => setShowFundAccount(false)}>
                <Text style={styles.closeBtnText}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={16}
                    style={styles.icon}
                    color="red"
                  />{" "}
                  Close
                </Text>
              </TouchableOpacity>
            </Text>

            <FundAccount currency={currency} />
            {/* <PaymentScreen amount={amount} currency={currency} /> */}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showToggleAccountSettings}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>
              Toggle Account Fund Status ({currency})
            </Text>
            <ToggleAccountSettings />

            <View style={styles.closeBtn}>
              <Button
                title="Close"
                onPress={() => setShowToggleAccountSettings(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDisableAccountSettings}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Account Fund Disabled</Text>
            <Text style={styles.modalText}>
              Account Fund is currently disabled. Please contact support for
              reactivation.
            </Text>
            <Button
              title="Close"
              onPress={() => setShowDisableAccountSettings(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  walletIcon: {
    marginRight: 5,
  },
  status: {
    marginBottom: 10,
  },
  lockIcon: {
    color: "red",
    marginRight: 5,
  },
  balance: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    padding: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  fundAccountBtn: {
    padding: 10,
  },
  spaceBtwGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  closeBtn: {
    padding: 10,
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  closeBtnText: {
    color: "red",
  },
});

export default GetNgnAccountFundBalance;
