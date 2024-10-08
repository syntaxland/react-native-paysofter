// LoginScreen.js
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  // Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-native-paper";
import { login, resetSuccessState } from "../../redux/actions/userActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { styles } from "../screenStyles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, userInfo, success } = useSelector(
    (state) => state.userLogin
  );

  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (userInfo && userInfo.is_verified) {
      setSuccessMessage("You are already logged in.");
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userInfo, navigation]);

  const lowerCaseEmail = email.toLowerCase();
  const loginData = useMemo(() => {
    return {
      email: lowerCaseEmail.trim(),
      password: password.trim(),
    };
  }, [lowerCaseEmail, password]);

  const submitHandler = () => {
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetSuccessState());
        navigation.navigate("Home");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, userInfo, dispatch, navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Card style={styles.headerCard}>
            <Card.Content>
              <Text style={styles.header}>Login</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.container}>
          {loading && <Loader />}
          {error && <Message variant="error">{error}</Message>}
          {success && <Message variant="success">Login successful</Message>}

          {successMessage && (
            <Message variant="success">{successMessage}</Message>
          )}

          <View style={styles.cardContainer}>
            <Card style={styles.headerCard}>
              <Card.Content>
                <View style={styles.inputContainer}>
                  <FontAwesomeIcon icon={faUser} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <FontAwesomeIcon icon={faKey} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={submitHandler}
              disabled={loading || !email || !password}
              style={
                loading || success || !email || !password
                  ? styles.roundedDisabledBtn
                  : styles.roundedPrimaryBtn
              }
            >
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              disabled={loading}
              style={
                loading || success
                  ? styles.roundedDisabledBtn
                  : styles.roundedSuccessBtn
              }
            >
              <Text style={styles.btnTxt}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.primaryText}>Forgot Password? </Text>
            <TouchableOpacity
              // onPress={() => navigation.navigate("Reset Password")}
              disabled={loading}
              style={
                loading || success
                  ? styles.roundedDisabledBtn
                  : styles.roundedDangerBtn
              }
            >
              <Text style={styles.btnTxt}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
