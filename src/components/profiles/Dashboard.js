// Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; 
import {
  faPhone,
  faLightbulb,
  faWifi,
  faTelevision,
  faGlobe,
  faPlane,
  faGamepad,
  faCalculator,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
// import { getUserProfile } from "../../redux/actions/userProfileActions";
// import GetNgnAccountFundBalance from "../FundAccount/GetNgnAccountFundBalance";
// import GetUsdAccountFundBalance from "../FundAccount/GetUsdAccountFundBalance";
import SelectCurrency from "../settings/SelectCurrency";
// import Message from "../../Message";
// import Loader from "../../Loader";
// import { styles } from "../profileStyles";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile, loading, error } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  // const selectedCurrency = profile?.selected_currency;
  // console.log("selected_currency:", profile?.selected_currency);

  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // dispatch(getUserProfile());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  const services = [
    { title: "Airtime", icon: faPhone },
    { title: "Electricity", icon: faLightbulb },
    { title: "Mobile Data", icon: faWifi },
    { title: "CableTV", icon: faTelevision },
    { title: "Internet", icon: faGlobe },
    { title: "Book Flight", icon: faPlane },
    { title: "Gaming", icon: faGamepad },
    { title: "POS Terminal", icon: faCalculator },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>
              <FontAwesomeIcon icon={faDashboard} /> Dashboard
            </Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.innerContainer}>
        {/* {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>} */}

        <View style={styles.currencySelector}>
          <SelectCurrency />
        </View>

        {/* <View style={styles.accountBalance}>
              {selectedCurrency === "NGN" && <GetNgnAccountFundBalance />}
              {selectedCurrency === "USD" && <GetUsdAccountFundBalance />}
            </View> */}

        <View style={styles.servicesContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Services</Text>

              <View style={styles.servicesItems}>
                {services.map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.serviceButton}
                    onPress={() => {}}
                  >
                    <Text style={styles.buttonText}>
                      {service.title}{" "}
                      <FontAwesomeIcon
                        icon={service.icon}
                        style={styles.icon}
                        color="#fff"
                      />
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  currencySelector: {
    width: "100%",
    // alignItems: "center",
    padding: 20,
    // marginVertical: 10,
  },
  accountBalance: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  servicesContainer: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
  },
  servicesItems: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    marginBottom: 16,
  },
  serviceButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardContainer: {
    padding: 2,
  },
});

export default Dashboard;
