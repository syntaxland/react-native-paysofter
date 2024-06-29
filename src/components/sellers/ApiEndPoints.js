// ApiEndPoints.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-native-paper";
import Message from "../../Message";
import Loader from "../../Loader";

function ApiEndPoints() {
  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("profile:", profile);

  const [isTestSecretKeyCopied, setIsTestSecretKeyCopied] = useState(false);
  const [testSecretKeyVisible, setTestSecretKeyVisible] = useState(false);
  const [isTestKeyCopied, setIsTestKeyCopied] = useState(false);

  const [isLiveSecretKeyCopied, setIsLiveSecretKeyCopied] = useState(false);
  const [liveSecretKeyVisible, setLiveSecretKeyVisible] = useState(false);
  const [isLiveKeyCopied, setIsLiveKeyCopied] = useState(false);

  const copyToClipboardTestSecretKey = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsTestSecretKeyCopied(true);
    setTimeout(() => {
      setIsTestSecretKeyCopied(false);
    }, 3000);
  };

  const copyToClipboardTestKey = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsTestKeyCopied(true);
    setTimeout(() => {
      setIsTestKeyCopied(false);
    }, 3000);
  };

  const toggleTestSecretKeyVisibility = () => {
    setTestSecretKeyVisible(!testSecretKeyVisible);
  };

  const copyToClipboardLiveSecretKey = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsLiveSecretKeyCopied(true);
    setTimeout(() => {
      setIsLiveSecretKeyCopied(false);
    }, 3000);
  };

  const copyToClipboardLiveKey = async (text) => {
    await Clipboard.setStringAsync(text);
    setIsLiveKeyCopied(true);
    setTimeout(() => {
      setIsLiveKeyCopied(false);
    }, 3000);
  };

  const toggleLiveSecretKeyVisibility = () => {
    setLiveSecretKeyVisible(!liveSecretKeyVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>
              <FontAwesomeIcon icon={faCopy} size={24} /> API EndPoints & Keys
            </Text>
          </Card.Content>
        </Card>
      </View>

      {profileLoading && <Loader />}
      {profileError && <Message variant="danger">{profileError}</Message>}

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.accordion}>
              <Text style={styles.accordionHeader}>Test API keys</Text>
              <View style={styles.accordionBody}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Test API Public key</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.test_api_key}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => copyToClipboardTestKey(profile.test_api_key)}
                  >
                    <Text style={styles.buttonText}>
                      {isTestKeyCopied ? (
                        <Text>
                          <FontAwesomeIcon icon={faCheck} size={16} /> Copied
                        </Text>
                      ) : (
                        <Text>
                          <FontAwesomeIcon icon={faCopy} size={16} /> Copy
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Test Secret Key</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.test_api_secret_key}
                    editable={false}
                    secureTextEntry={!testSecretKeyVisible}
                  />
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={toggleTestSecretKeyVisibility}
                    >
                      <Text style={styles.buttonText}>
                        {testSecretKeyVisible ? (
                          <Text>
                            <FontAwesomeIcon icon={faEyeSlash} size={16} /> Hide
                          </Text>
                        ) : (
                          <Text>
                            <FontAwesomeIcon icon={faEye} size={16} /> Show
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        copyToClipboardTestSecretKey(
                          profile.test_api_secret_key
                        )
                      }
                    >
                      <Text style={styles.buttonText}>
                        {isTestSecretKeyCopied ? (
                          <Text>
                            <FontAwesomeIcon icon={faCheck} size={16} /> Copied
                          </Text>
                        ) : (
                          <Text>
                            <FontAwesomeIcon icon={faCopy} size={16} /> Copy
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.accordion}>
              <Text style={styles.accordionHeader}>Live API keys</Text>
              <View style={styles.accordionBody}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Live API Public key</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.live_api_key}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => copyToClipboardLiveKey(profile.live_api_key)}
                  >
                    <Text style={styles.buttonText}>
                      {isLiveKeyCopied ? (
                        <Text>
                          <FontAwesomeIcon icon={faCheck} size={16} /> Copied
                        </Text>
                      ) : (
                        <Text>
                          <FontAwesomeIcon icon={faCopy} size={16} /> Copy
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Live Secret Key</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.live_api_secret_key}
                    editable={false}
                    secureTextEntry={!liveSecretKeyVisible}
                  />
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={toggleLiveSecretKeyVisibility}
                    >
                      <Text style={styles.buttonText}>
                        {liveSecretKeyVisible ? (
                          <Text>
                            <FontAwesomeIcon icon={faEyeSlash} size={16} /> Hide
                          </Text>
                        ) : (
                          <Text>
                            <FontAwesomeIcon icon={faEye} size={16} /> Show
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        copyToClipboardLiveSecretKey(
                          profile.live_api_secret_key
                        )
                      }
                    >
                      <Text style={styles.buttonText}>
                        {isLiveSecretKeyCopied ? (
                          <Text>
                            <FontAwesomeIcon icon={faCheck} size={16} /> Copied
                          </Text>
                        ) : (
                          <Text>
                            <FontAwesomeIcon icon={faCopy} size={16} /> Copy
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  accordion: {
    marginBottom: 20,
  },
  accordionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accordionBody: {
    paddingTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginRight: 10,
  },
  buttonText: {
    color: "blue",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardContainer: {
    padding: 10,
    marginBottom: 10,
  },
});

export default ApiEndPoints;
