// UserProfile.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  // faExclamationTriangle,
  faUserCheck,
  faUser,
  faCheckCircle,
  faTimesCircle,
  faCopy,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getUserProfile,
  updateUserProfile,
} from "../../redux/actions/userProfileActions";
import { sendEmailOtp } from "../../redux/actions/emailOtpActions";
import { List } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { Card } from "react-native-paper";
import Message from "../../Message";
import Loader from "../../Loader";

function UserProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, success, error } = updateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(updateUserProfile());
    dispatch(getUserProfile());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  const [successMessage, setSuccessMessage] = useState("");
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);
  const [isSecurityCodeCopied, setIsSecurityCodeCopied] = useState(false);
  const [isAccountIdCopied, setIsAccountIdCopied] = useState(false);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        avatar: userInfo.avatar,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [success]);

  // const handleAvatarChange = (e) => {
  //   const avatar = e.target.files[0];
  //   if (avatar) {
  //     const formData = new FormData();
  //     formData.append("avatar", avatar);
  //     dispatch(updateUserAvatar(formData));
  //   }
  // };

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  const handleResendEmailOtp = () => {
    dispatch(sendEmailOtp(userInfo?.email, userInfo?.first_name));
    navigation.navigate("VerifyEmailOtp");
  };

  const handleVerifyEmail = () => {
    if (!userInfo?.is_verified) {
      handleResendEmailOtp();
    }
  };

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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.header}>
                {" "}
                Profile{" "}
                <FontAwesomeIcon
                  icon={userInfo.is_verified ? faUserCheck : faUser}
                />
              </Text>
            </Card.Content>
          </Card>
        </View>

        {loading && <Loader />}
        {profileLoading && <Loader />}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}

        {error && <Message variant="danger">{error}</Message>}
        {profileError && <Message variant="danger">{error}</Message>}

        <Text>
          Verified{" "}
          <FontAwesomeIcon
            icon={userInfo?.is_verified ? faCheckCircle : faTimesCircle}
            style={{ color: userInfo.is_verified ? "white" : "red" }}
          />
        </Text>

        <View style={styles.item}>
          <List.Accordion
            title="Bio"
            left={(props) => <List.Icon {...props} icon="account" />}
          >
            {!userInfo.is_verified && (
              <Button title="Verify Email" onPress={handleVerifyEmail} />
            )}

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={profile?.username}
              editable={false}
              onChangeText={(value) => handleInputChange("username", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userData.first_name}
              onChangeText={(value) => handleInputChange("first_name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userData.last_name}
              onChangeText={(value) => handleInputChange("last_name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={profile?.email}
              editable={false}
              onChangeText={(value) => handleInputChange("email", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={userData?.phone_number}
              onChangeText={(value) => handleInputChange("phone_number", value)}
            />

            <Button
              title="Update Profile"
              onPress={handleUpdateProfile}
              color="green"
            />
          </List.Accordion>
        </View>

        {/* <View style={styles.item}>
          <List.Accordion
            title="Update Avatar"
            left={(props) => <List.Icon {...props} icon="camera" />}
          >
            <TextInput
              style={styles.input}
              placeholder="Avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </List.Accordion>
        </View> */}

        <View style={styles.item}>
          <List.Accordion
            title="Account Details"
            left={(props) => <List.Icon {...props} icon="key" />}
          >
            <Text style={styles.title}>Account ID</Text>
            <View style={styles.accountIdContainer}>
              <TextInput
                style={styles.input}
                placeholder="Account ID"
                value={profile?.account_id}
                editable={false}
              />
              {/* <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboardAccountId(profile?.account_id)}
              >
                <FontAwesomeIcon icon={faCopy} size={24} />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboardAccountId(profile?.account_id)}
              >
                <Text style={styles.label}>
                  {isAccountIdCopied ? (
                    <Text style={styles.label}>
                      Copied{" "}
                      <FontAwesomeIcon
                        icon={faCheck}
                        size={24}
                        // style={styles.icon}
                      />
                    </Text>
                  ) : (
                    <Text style={styles.label}>
                      <FontAwesomeIcon
                        icon={faCopy}
                        size={24}
                        // style={styles.icon}
                      />{" "}
                      Copy
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Security Code</Text>
            <View style={styles.securityCodeContainer}>
              <TextInput
                style={styles.input}
                placeholder="Security Code"
                secureTextEntry={!securityCodeVisible}
                value={profile.security_code}
                editable={false}
              />

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
                        // style={styles.icon}
                      />
                    </Text>
                  ) : (
                    <Text style={styles.label}>
                      <FontAwesomeIcon
                        icon={faCopy}
                        size={24}
                        // style={styles.icon}
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
                <Text style={styles.toggleVisibilityText}>
                  {securityCodeVisible ? (
                    <Text>
                      <FontAwesomeIcon icon={faEyeSlash} size={24} /> Hide
                    </Text>
                  ) : (
                    <Text>
                      <FontAwesomeIcon icon={faEye} size={24} /> Show
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </List.Accordion>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    // textAlign: "center",
    paddingBottom: 5,
  },
  item: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  warning: {
    color: "orange",
    marginBottom: 10,
  },
  securityCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    marginLeft: 10,
  },
  toggleVisibilityButton: {
    marginLeft: 10,
  },
  toggleVisibilityText: {
    color: "blue",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardContainer: {
    padding: 16,
  },
});

export default UserProfile;
