// Settings.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle,
  faSun,
  faMoon,
  faLock,
  faLockOpen,
  faSackDollar,
  faToggleOff,
  faToggleOn,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  getUserAccountFundBalance,
  getUserUsdAccountFundBalance,
} from "../../redux/actions/AccountFundActions";
import { View, Text, Button, Modal } from "react-native";
import { List } from "react-native-paper";
import Message from "../../Message";
import Loader from "../../Loader";
import ToggleAccountSettings from "./ToggleAccountSettings";
import MaxWithdrawalSettings from "./MaxWithdrawalSettings";
import SetMaxUsdWithdrawal from "./SetMaxUsdWithdrawal";
import ToggleUsdAccountSettings from "./ToggleUsdAccountSettings";

function Settings() {
  const dispatch = useDispatch();

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, error } = updateProfile;

  const userAccountBalanceState = useSelector(
    (state) => state.userAccountBalanceState
  );
  const { accountFundBalance } = userAccountBalanceState;

  const getUserUsdAccountFundBalanceState = useSelector(
    (state) => state.getUserUsdAccountFundBalanceState
  );
  const { usdFundBalance } = getUserUsdAccountFundBalanceState;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const selectedCurrency = profile?.selected_currency;

  const navigation = useNavigation();

  const [showSetMaxFund, setShowSetMaxFund] = useState(false);
  const [showToggleAccountSettings, setShowToggleAccountSettings] =
    useState(false);
  const [showDisableAccountSettings, setShowDisableAccountSettings] =
    useState(false);

  const handleDisableFundOpen = () => {
    setShowDisableAccountSettings(true);
  };
  const handleDisableFundClose = () => {
    setShowDisableAccountSettings(false);
  };

  const handleToggleFundOpen = () => {
    setShowToggleAccountSettings(true);
  };

  const handleToggleFundClose = () => {
    setShowToggleAccountSettings(false);
  };

  const handleSetMaxFundOpen = () => {
    setShowSetMaxFund(true);
  };

  const handleSetMaxFundClose = () => {
    setShowSetMaxFund(false);
  };

  const handleDeleteAccount = () => {
    navigation.navigate("DeleteAccount");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserAccountFundBalance());
    dispatch(getUserUsdAccountFundBalance());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ textAlign: "center", padding: 10, fontSize: 24 }}>
        <FontAwesomeIcon icon={faGear} /> Settings
      </Text>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <List.Section>
        {selectedCurrency === "NGN" && (
          <View>
            <List.Accordion
              title={`Account Fund (${selectedCurrency})`}
              left={(props) => (
                <FontAwesomeIcon
                  {...props}
                  icon={
                    accountFundBalance?.is_disabled
                      ? faLock
                      : accountFundBalance?.is_active
                      ? faLockOpen
                      : faLock
                  }
                  color={
                    accountFundBalance?.is_disabled
                      ? "red"
                      : accountFundBalance?.is_active
                      ? "green"
                      : "orange"
                  }
                />
              )}
            >
              <View>
                <Text style={{ paddingVertical: 10, fontSize: 18 }}>
                  Toggle Account Fund Status
                </Text>
                <Text>
                  Enable or disable Account Fund. Note that this action will
                  block or enable all transaction withdrawals from this account.
                </Text>
                <Button
                  onPress={handleToggleFundOpen}
                  title={accountFundBalance?.is_active ? "Disable" : "Enable"}
                />

                <Modal
                  visible={showToggleAccountSettings}
                  onDismiss={handleToggleFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Toggle Account Fund Status
                    </Text>
                    {showToggleAccountSettings && <ToggleAccountSettings />}
                    <Button title="Close" onPress={handleToggleFundClose} />
                  </View>
                </Modal>

                <Modal
                  visible={showDisableAccountSettings}
                  onDismiss={handleDisableFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Account Fund Disabled
                    </Text>
                    <Text style={{ textAlign: "center", padding: 10 }}>
                      Account Fund is currently disabled. Please contact support
                      for reactivation.
                    </Text>
                    <Button title="Close" onPress={handleDisableFundClose} />
                  </View>
                </Modal>
              </View>

              <View>
                <Text style={{ paddingVertical: 10, fontSize: 18 }}>
                  Set Maximum Withdrawal
                </Text>
                <Text>
                  The maximum amount that can be withdrawn from this fund
                  account can be set.
                </Text>
                <Button onPress={handleSetMaxFundOpen} title="Set Limit" />

                <Modal
                  visible={showSetMaxFund}
                  onDismiss={handleSetMaxFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Set Maximum Withdrawal Account
                    </Text>
                    {showSetMaxFund && <MaxWithdrawalSettings />}
                    <Button title="Close" onPress={handleSetMaxFundClose} />
                  </View>
                </Modal>
              </View>
            </List.Accordion>
          </View>
        )}

        {selectedCurrency === "USD" && (
          <View>
            <List.Accordion
              title={`Account Fund (${selectedCurrency})`}
              left={(props) => (
                <FontAwesomeIcon
                  {...props}
                  icon={
                    usdFundBalance?.is_disabled
                      ? faLock
                      : usdFundBalance?.is_active
                      ? faLockOpen
                      : faLock
                  }
                  color={
                    usdFundBalance?.is_disabled
                      ? "red"
                      : usdFundBalance?.is_active
                      ? "green"
                      : "orange"
                  }
                />
              )}
            >
              <View>
                <Text style={{ paddingVertical: 10, fontSize: 18 }}>
                  Toggle Account Fund Status
                </Text>
                <Text>
                  Enable or disable Account Fund. Note that this action will
                  block or enable all transaction withdrawals from this account.
                </Text>
                <Button
                  onPress={handleToggleFundOpen}
                  title={usdFundBalance?.is_active ? "Disable" : "Enable"}
                />

                <Modal
                  visible={showToggleAccountSettings}
                  onDismiss={handleToggleFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Toggle Account Fund Status
                    </Text>
                    {showToggleAccountSettings && <ToggleUsdAccountSettings />}
                    <Button title="Close" onPress={handleToggleFundClose} />
                  </View>
                </Modal>

                <Modal
                  visible={showDisableAccountSettings}
                  onDismiss={handleDisableFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Account Fund Disabled
                    </Text>
                    <Text style={{ textAlign: "center", padding: 10 }}>
                      Account Fund is currently disabled. Please contact support
                      for reactivation.
                    </Text>
                    <Button title="Close" onPress={handleDisableFundClose} />
                  </View>
                </Modal>
              </View>

              <View>
                <Text style={{ paddingVertical: 10, fontSize: 18 }}>
                  Set Maximum Withdrawal
                </Text>
                <Text>
                  The maximum amount that can be withdrawn from this fund
                  account can be set.
                </Text>
                <Button onPress={handleSetMaxFundOpen} title="Set Limit" />

                <Modal
                  visible={showSetMaxFund}
                  onDismiss={handleSetMaxFundClose}
                >
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{ textAlign: "center", padding: 10, fontSize: 18 }}
                    >
                      Set Maximum Withdrawal Account
                    </Text>
                    {showSetMaxFund && <SetMaxUsdWithdrawal />}
                    <Button title="Close" onPress={handleSetMaxFundClose} />
                  </View>
                </Modal>
              </View>
            </List.Accordion>
          </View>
        )}

        <List.Accordion title="Change Password">
          <View>
            <Text>Password</Text>
            <Text>***************</Text>
            <Button onPress={handleChangePassword} title="Change Password" />
          </View>
        </List.Accordion>

        <List.Accordion title="Delete Account">
          <View>
            <Text>Delete Account</Text>
            <Text>Proceed to delete your account.</Text>
            <Button onPress={handleDeleteAccount} title="Delete Account" />
          </View>
        </List.Accordion>
      </List.Section>
    </View>
  );
}

export default Settings;
