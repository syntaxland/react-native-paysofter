// Quotes.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-native-reanimated-carousel";

const quotes = [
  "For a softer payment experience...",
  "Softer Pays, Any Day!",
  "Globally Pay, Live Softer!",
  "Soft Pays, PaySofter Stays!",
  "Pay Smoother, Choose PaySofter!",
  "PaySofter.com: Global Payments, Softer Vibes!",
  "Your Softer Pay Companion!",
  "Smooth Payments, Sharp Results - Choose PaySofter!",
  "In the Symphony of Payments, PaySofter Sways.",
  "Pay Globally, Stay Softer!",
  "Softening Your Every Pay Day!",
  "Soft Pays, Bright Rays - It's PaySofter Always.",
  "PaySofter: Pay, Stay Soft!",
  "Softer Pays, Any Place!",
  "Where Transactions Meet Tranquility - PaySofter.",
  "Your Oasis for Softer Payments!",
  "Pay Bliss, Choose Softer!",
  "For Payments Clear, The Softer Frontier.",
  "Your Partner for Softer Payments!",
  "Every Pay, a Pleasure in Softness!",
  "Soften Payments, Go Global!",
  "In the World of Payments, PaySofter Plays.",
  "Crafted for Humans, Softened for You!",
  "Soft Solutions, Seamless Payments - PaySofter!",
  "Making Payments Painless - Welcome to PaySofter!",
  "Soften Your Wallet with PaySofter!",
  "Softer Pay, Swiftly Sway - PaySofter Every Day.",
  "Softer Pays, Brighter Days - PaySofter's Ways.",
  "Soft Pays, Brighter Arrays - PaySofter Stays.",
  "Your Pay Haven, Where Experiences Soften!",
  "Where Paying Feels Effortless.",
  "Ease into Payments with PaySofter!",
  "Smooth Pays, Brighter Days - PaySofter Stays.",
  "Soft on Process, Solid on Payments - PaySofter!",
  "Softly Pay, Swiftly Sway - PaySofter Every Day.",
  "Pay Easy, Live Softer!",
  "Your Transactions, Our Soft Touch - PaySofter.",
  "Softer Ways to Pay Every Day!",
  "Your Pay Haven, Where Experiences Soften!",
  "Global Pay, Softer Way!",
  "Where Transactions Meet Tranquility - PaySofter.",
  "PaySofter: Where Every Transaction Counts!",
  "Softening the Paying Experience - PaySofter Unleashed!",
  "Paying? Go Softer, Go Global!",
  "Soften Payments, Go Global!",
  "Pay Globally, Pay Softer!",
  "Your Oasis for Softer Payments!",
];

const Quotes = () => {
  const renderQuoteItem = ({ index }) => (
    <View
      style={{
        height: 40,
        flex: 1,
        justifyContent: "center",
        padding: 20,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          padding: 20,
          paddingHorizontal: 20,
          fontSize: 14,
        }}
      >
        <FontAwesomeIcon icon={faQuoteLeft} size={14} /> {quotes[index]}{" "}
        <FontAwesomeIcon icon={faQuoteRight} size={14} />
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.quote}>
            <Carousel
              loop
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width / 2}
              autoPlay={true}
              data={quotes}
              scrollAnimationDuration={3000}
              renderItem={renderQuoteItem}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 10,
    paddingBottom: 10,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  quote: {
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 30,
  },
});

export default Quotes;
