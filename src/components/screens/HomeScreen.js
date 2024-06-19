import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { quotes } from "../../data";
import Quotes from "../../Quotes";

const HomeScreen = () => {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const renderQuoteItem = ({ index }) => (
  //   <View style={{ ...styles.container, height: 60, justifyContent: "center" }}>
  //     <Text style={{ textAlign: "center", fontSize: 14 }}>
  //       <FontAwesomeIcon icon={faQuoteLeft} size={14} style={styles.cartIcon} />
  //       {quotes[index]}
  //       <FontAwesomeIcon
  //         icon={faQuoteRight}
  //         size={14}
  //         style={styles.cartIcon}
  //       />
  //     </Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <Text style={styles.title}>Paysofter</Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <Quotes />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <Text style={styles.title}>Your Softer Experience!</Text>
              <Text style={styles.description}>
                In the realm of SOFT ways of doing things, seamless transactions
                and convenient payments, there exists yet a SOFTER way of going
                about them at a level of sophistication beyond the ordinary. Our
                goal is to provide that experience.
              </Text>
              <Button
                title="Learn More"
                onPress={() => navigation.navigate("About")}
                disabled
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <Text style={styles.title}>Selling Point</Text>
              <Text style={styles.description}>
                Fade up with the persistent uncertainty surrounding the 'pay on
                delivery' scenarios between sellers and buyers, coupled with the
                resulting lack of trust? Paysofter Promise fills in this gap!
                With Paysofter Promise, payments made to a seller (utilizing the
                buyer's funded Paysofter Account Fund) are securely held in
                escrow until specified conditions agreed upon by both the buyer
                and seller are met.
              </Text>
              {!userInfo && (
                <Button
                  title="Open A Free Account"
                  onPress={() => navigation.navigate("Register")}
                />
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <Text style={styles.title}>Our Distinctive Approach</Text>
              <Text style={styles.description}>
                Even when you're asleep, Paysofter is actively working for you.
                Engrossed in your daily tasks? Paysofter effortlessly generates
                earnings on your behalf, rewarding your past endeavours...
              </Text>
              {!userInfo && (
                <Button
                  title="Register"
                  onPress={() => navigation.navigate("Register")}
                />
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.container}>
              <Text style={styles.title}>Holding Your Hands</Text>
              <Text style={styles.description}>
                Here comes a system that recognizes and awards credit points for
                each transactional effort. Don't possess a Paysofter account
                yet? You're merely three minutes away! Embark on a journey
                towards a remarkably smoother and softer payment experience. A
                gateway crafted for every individual!
              </Text>
              {!userInfo && (
                <Button
                  title="Sign Up"
                  onPress={() => navigation.navigate("Register")}
                />
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollViewContent: {
    padding: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  container: {
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 10,
  },
  cartIcon: {
    marginHorizontal: 5,
  },
});

export default HomeScreen;
