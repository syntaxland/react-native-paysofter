// PaystackPayment.js
import React, {
  useEffect,
  useState
} from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Paystack } from "react-native-paystack-webview";
import { Card } from "react-native-paper";
// import {
//   fundUserAccount,
//   resetFundUserAccount,
// } from "../../redux/actions/AccountFundActions";
// import Loader from "../../Loader";
// import Message from "../../Message";
import { formatAmount } from "../../FormatAmount";

const PaystackPayment = ({
  currency,
  amount,
  paystackPublicKey,
  userEmail,
  onSuccess,
  onClose,
}) => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  // const fundAccountState = useSelector((state) => state.fundAccountState);
  // const { loading, success, error } = fundAccountState;

  // const createdAt = new Date().toISOString();

  // useEffect(() => {
  //   if (success) {
  //     const timer = setTimeout(() => {
  //       dispatch(resetFundUserAccount());
  //       navigation.navigate("Home");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [success, navigation]);

  // const handlePayment = () => {
  //   const fundData = {
  //     email: userEmail,
  //     amount: amount,
  //     currency: currency,
  //     created_at: createdAt,
  //   };
  //   dispatch(fundUserAccount(fundData));
  // };

  // const onSuccess = () => {
  //   handlePayment();
  // };

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const initiatePayment = () => {
    setPaymentInitiated(true);
  };

  // console.log("PaystackPayment");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>Paystack Payment Option</Text>

            {/* {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            {success && (
              <Message variant="success">
                Your account funded with {amount} {currency}.
              </Message>
            )} */}

            <View style={styles.infoContainer}>
              <Text>
                Amount: {formatAmount(amount)} {currency}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.center}>
                {!paymentInitiated && (
                  <Button
                    title="Pay Now"
                    onPress={initiatePayment}
                    color="#343a40"
                  />
                )}
              </View>

              {paymentInitiated && (
                <Paystack
                  paystackKey={paystackPublicKey}
                  amount={amount}
                  billingEmail={userEmail}
                  // billingMobile="1234567890"
                  reference={`ref_${Math.floor(Math.random() * 1000000000)}`}
                  activityIndicatorColor="green"
                  onCancel={() => setPaymentInitiated(false)}
                  onSuccess={onSuccess}
                  onError={(error) => console.log(error)}
                  autoStart={true}
                />
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  center: {
    alignItems: "center",
  },
});

export default PaystackPayment;
