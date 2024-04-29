// HomeScreen.js
import React from "react"; // useState, //  useEffect, // useCallback,
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import // useDispatch,
//  useSelector
"react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../screenStyles";
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

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderQuoteItem = ({ index }) => (
    <View
      style={{
        height: 60,
        flex: 1,
        // borderWidth: 1,
        justifyContent: "center",
        // padding: 20,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          size={14}
          // color="white"
          style={styles.cartIcon}
        />{" "}
        {quotes[index]}{" "}
        <FontAwesomeIcon
          icon={faQuoteRight}
          size={14}
          // color="white"
          style={styles.cartIcon}
        />
      </Text>
    </View>
  );

  console.log("Hello Paysofter!");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Your Softer Experience</Text>
          <Text>
            In the realm of SOFT ways of doing things, seamless transactions and
            convenient payments, there exists yet a SOFTER way of going about
            them at a level of sophistication beyond the ordinary.{" "}
          </Text>
          <Button
            style={styles.button}
            title="Create A Free Account"
            onPress={() => navigation.navigate("Register")}
          />

          <Text style={styles.title}>Selling Point</Text>
          <Text>
            Fade up with the persistent uncertainty surrounding the 'pay on
            delivery' scenarios between sellers and buyers, coupled with the
            resulting lack of trust? Paysofter Promise fills in this gap! With
            Paysofter Promise, payments made to a seller (utilizing the buyer's
            funded Paysofter Account Fund) are securely held in escrow until
            specified conditions agreed upon by both the buyer and seller are
            met.
          </Text>
          <Button
            style={styles.button}
            title="Open A Free Account"
            onPress={() => navigation.navigate("Register")}
          />

          <Text style={styles.title}>Our Distinctive Approach</Text>
          <Text>
            Even when you're asleep, Paysofter is actively working for you.
            Engrossed in your daily tasks? Paysofter effortlessly generates
            earnings on your behalf, rewarding your past endeavours...{" "}
          </Text>
          <Button
            style={styles.button}
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />

          <Text style={styles.title}>Holding Your Hands</Text>
          <Text>
            Here comes a system that recognizes and awards credit points for
            each transactional effort. Don't possess a Paysofter account yet?
            You're merely three minutes away! Embark on a journey towards a
            remarkably smoother and softer payment experience. A gateway crafted
            for every individual!"{" "}
          </Text>
          <Button
            style={styles.button}
            title="Sign up"
            onPress={() => navigation.navigate("Register")}
          />

          <View
            style={
              {
                // padding: 20,
              }
            }
          >
            <Carousel
              loop
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width / 2}
              autoPlay={true}
              data={quotes}
              scrollAnimationDuration={3000}
              renderItem={renderQuoteItem}
              // onSnapToItem={(index) => console.log("current index:", index)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
