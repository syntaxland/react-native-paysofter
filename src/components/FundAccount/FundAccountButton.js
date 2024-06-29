// FundAccountButton.js
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTimes,
  faCreditCard,
  // faExchange,
  // faBank,
  // faMobile,
  // faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";
import CardPayment from "./CardPayment";
import CardPaymentUsd from "./CardPaymentUsd";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import QrPayment from "./QrPayment";
import { formatAmount } from "../../FormatAmount";

const FundAccountButton = ({ amount, currency }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showFundAccountButton, setShowFundAccountButton] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.center}>
          <Button
            title="Pay Now"
            onPress={() => setShowFundAccountButton(true)}
            color="#007bff"
          />
        </View>

        <Modal
          visible={showFundAccountButton}
          onRequestClose={() => setShowFundAccountButton(false)}
          animationType="slide"
        >
          <View style={styles.modalHeader}>
            <Card style={styles.card}>
              <Card.Content>
                <TouchableOpacity
                  onPress={() => setShowFundAccountButton(false)}
                >
                  <Text style={styles.closeButton}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      size={16}
                      style={styles.icon}
                    />{" "}
                    Close
                  </Text>
                </TouchableOpacity>

                {/* <Text style={styles.modalHeading}> */}
                <Text style={styles.modalTitle}>Paysofter (Mock Payment)</Text>
                <Text>{userInfo.email}</Text>
                <Text>{`${formatAmount(amount)} ${currency}`}</Text>
                {/* </Text> */}
              </Card.Content>
            </Card>
          </View>

          <ScrollView>
            <View style={styles.options}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.title}>Options</Text>

                  {currency === "USD" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.closeButton}>
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          size={32}
                          style={styles.icon}
                        />{" "}
                        <Button
                          title="Debit Card (USD)"
                          onPress={() => handlePaymentOptionChange("card")}
                          color={
                            selectedPaymentOption === "card"
                              ? "#007bff"
                              : "#6c757d"
                          }
                        />
                      </Text>
                    </View>
                  )}

                  {currency === "NGN" && (
                    <View style={styles.payOptionBtn}>
                      <Text style={styles.closeButton}>
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          size={32}
                          style={styles.icon}
                        />{" "}
                        <Button
                          title="Debit Card (NGN)"
                          onPress={() => handlePaymentOptionChange("card")}
                          color={
                            selectedPaymentOption === "card"
                              ? "#007bff"
                              : "#6c757d"
                          }
                        />
                      </Text>
                    </View>
                  )}

                  <View style={styles.payOptionBtn}>
                    <Button
                      title="Transfer"
                      onPress={() => handlePaymentOptionChange("transfer")}
                      color={
                        selectedPaymentOption === "transfer"
                          ? "#007bff"
                          : "#6c757d"
                      }
                      disabled
                    />
                  </View>

                  <View style={styles.payOptionBtn}>
                    <Button
                      title="Bank"
                      onPress={() => handlePaymentOptionChange("bank")}
                      color={
                        selectedPaymentOption === "bank" ? "#007bff" : "#6c757d"
                      }
                      disabled
                    />
                  </View>

                  <View style={styles.payOptionBtn}>
                    <Button
                      title="USSD"
                      onPress={() => handlePaymentOptionChange("ussd")}
                      color={
                        selectedPaymentOption === "ussd" ? "#007bff" : "#6c757d"
                      }
                      disabled
                    />
                  </View>

                  <View style={styles.payOptionBtn}>
                    <Button
                      title="Visa QR"
                      onPress={() => handlePaymentOptionChange("qr")}
                      color={
                        selectedPaymentOption === "qr" ? "#007bff" : "#6c757d"
                      }
                      disabled
                    />
                  </View>
                </Card.Content>
              </Card>
            </View>

            <View style={styles.paymentDetails}>
              {currency === "NGN" && selectedPaymentOption === "card" && (
                <CardPayment
                  amount={amount}
                  currency={currency}
                  userEmail={userInfo.email}
                />
              )}

              {currency === "USD" && selectedPaymentOption === "card" && (
                <CardPaymentUsd
                  amount={amount}
                  currency={currency}
                  userEmail={userInfo.email}
                />
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  center: {
    alignItems: "center",
  },
  modalHeader: {
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    // alignItems: "center",
  },
  closeButton: {
    // alignSelf: "flex-end",
    alignSelf: "center",
    padding: 10,
    fontSize: 18,
    color: "blue",
  },
  payOptionBtn: {
    padding: 3,
  },
  modalHeading: {
    // textAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
  },
  options: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  paymentDetails: {
    padding: 20,
  },
  icon: {
    marginRight: 5,
  },
});

export default FundAccountButton;
