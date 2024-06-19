// AccountDetails.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faCopy,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import * as Clipboard from "expo-clipboard";
import { Card } from "react-native-paper";
import Message from "../../Message";
import Loader from "../../Loader";

function AccountDetails() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);
  const [isSecurityCodeCopied, setIsSecurityCodeCopied] = useState(false);
  const [isAccountIdCopied, setIsAccountIdCopied] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsSecurityCodeCopied(true);
    setTimeout(() => {
      setIsSecurityCodeCopied(false);
    }, 3000);
  };

  const copyToClipboardAccountId = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsAccountIdCopied(true);
    setTimeout(() => {
      setIsAccountIdCopied(false);
    }, 3000);
  };

  const toggleSecurityCodeVisibility = () => {
    setSecurityCodeVisible(!securityCodeVisible);
  };

  const formatAccountId = (accountID) => {
    if (accountID) {
      return accountID.match(/.{1,4}/g).join("-");
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Card style={styles.innerCard}>
              <Card.Content>
                <Text style={styles.header}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faUser}
                    color={styles.iconColor.color}
                  />
                  Account Details
                </Text>
              </Card.Content>
            </Card>
            {profileLoading && <Loader />}
            {profileError && <Message variant="danger">{profileError}</Message>}

            <View style={styles.item}>
              <View>
                <Text style={styles.title}>
                  Account ID:
                  {formatAccountId(profile.account_id)}
                </Text>
                <View style={styles.accountContainer}>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() =>
                      copyToClipboardAccountId(profile?.account_id)
                    }
                  >
                    <Text style={styles.label}>
                      {isAccountIdCopied ? (
                        <Text style={styles.label}>
                          Copied{" "}
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={24}
                            color={styles.iconColor.color}
                          />
                        </Text>
                      ) : (
                        <Text style={styles.label}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            size={24}
                            color={styles.iconColor.color}
                          />{" "}
                          Copy
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>
                  Security Code:{" "}
                  {securityCodeVisible ? profile.security_code : "****"}
                </Text>
                <View style={styles.accountContainer}>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(profile?.security_code)}
                  >
                    <Text style={styles.label}>
                      {isSecurityCodeCopied ? (
                        <Text style={styles.label}>
                          Copied{" "}
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={24}
                            color={styles.iconColor.color}
                          />
                        </Text>
                      ) : (
                        <Text style={styles.label}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            size={24}
                            color={styles.iconColor.color}
                          />{" "}
                          Copy
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.toggleVisibilityButton}
                    onPress={toggleSecurityCodeVisibility}
                  >
                    <Text style={styles.label}>
                      {securityCodeVisible ? (
                        <Text>
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            size={24}
                            color={styles.iconColor.color}
                          />{" "}
                          Hide
                        </Text>
                      ) : (
                        <Text>
                          <FontAwesomeIcon
                            icon={faEye}
                            size={24}
                            color={styles.iconColor.color}
                          />{" "}
                          Show
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#0f172a",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
    color: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#fff",
    padding: 5,
  },
  item: {
    // marginBottom: 20,
    padding: 10,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  copyButton: {
    marginLeft: 10,
  },
  toggleVisibilityButton: {
    marginLeft: 10,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  innerCard: {
    borderRadius: 8,
    backgroundColor: "#1a202c",
    alignItems: "center",
    padding: 2,
  },
  cardContainer: {
    padding: 16,
  },
  label: {
    color: "#fff",
  },
  iconColor: {
    color: "#fff",
  },
});

export default AccountDetails;
