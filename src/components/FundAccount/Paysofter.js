// Paysofter.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import { formatAmount } from "../../FormatAmount";
import FundAccountButton from "./FundAccountButton"; 

const Paysofter = ({ currency, amount }) => {
  const navigation = useNavigation();
 
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text style={styles.title}>Paysofter Payment Option</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.amount}>
              Amount: {formatAmount(amount)} {currency}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <FundAccountButton currency={currency} amount={amount} />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Paysofter;
