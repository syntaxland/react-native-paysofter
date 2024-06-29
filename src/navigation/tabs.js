// taps.js
import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../redux/actions/userProfileActions";
import HomeScreen from "../components/screens/HomeScreen";
// import PostFreeAd from "../components/marketplace/PostFreeAd";
import Dashboard from "../components/profiles/Dashboard";
import Inbox from "../components/profiles/Inbox";
import PaysofterPromiseBuyer from "../components/profiles/PaysofterPromiseBuyer";
// import PaysofterPromiseSeller from "../components/seller/PaysofterPromiseSeller";
import { Ionicons } from "@expo/vector-icons";
import { getUserMessages } from "../redux/actions/messagingActions";
import {
  getBuyerPromises,
  getSellerPromises,
} from "../redux/actions/PromiseActions";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(getUserMessages());
      dispatch(getBuyerPromises());
      dispatch(getSellerPromises());
    }
  }, [dispatch, userInfo]);

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { messages } = getUserMessagesState;

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );
  const getSellerPromiseState = useSelector(
    (state) => state.getSellerPromiseState
  );
  const { promises: sellerPromises } = getSellerPromiseState;

  const getBuyerPromiseState = useSelector(
    (state) => state.getBuyerPromiseState
  );
  const { promises: buyerPromises } = getBuyerPromiseState;

  const sellerMsgCounted = sellerPromises?.reduce(
    (total, userMessages) => total + userMessages.seller_msg_count,
    0
  );

  const buyerMsgCounted = buyerPromises?.reduce(
    (total, userMessages) => total + userMessages.buyer_msg_count,
    0
  );

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { tickets: userTickets } = listSupportTicketState;

  const supportMsgCounted = userTickets?.reduce(
    (total, userMessages) => total + userMessages.user_msg_count,
    0
  );

  const allTicketList = useSelector((state) => state.allTicketList);
  const { tickets: adminTickets } = allTicketList;

  const adminSupportMsgCounted = adminTickets?.reduce(
    (total, userMessages) => total + userMessages.admin_user_msg_count,
    0
  );

  const totalMsgCount = msgCounted + buyerMsgCounted + sellerMsgCounted;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f172a",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          } else if (route.name === "Inbox") {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === "Buyer Promises") {
            iconName = focused ? "card" : "card-outline";
          }
          // else if (route.name === "Seller Promises") {
          //   iconName = focused ? "cash" : "cash-outline";
          // }

          return (
            <Ionicons name={iconName} size={focused ? 32 : 18} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "Home",
        }}
        component={HomeScreen}
      />

      {/* <Tab.Screen name="Dashboard" component={Dashboard} /> */}

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!userInfo) {
              e.preventDefault();
              navigation.navigate("Login");
            }
          },
        })}
      />

      {userInfo && (
        <>
          <Tab.Screen
            name="Inbox"
            component={Inbox}
            options={{
              tabBarBadge:
                totalMsgCount > 0 ? (
                  <Text style={styles.msgCounter}>{totalMsgCount}</Text>
                ) : null,
            }}
          />
        </>
      )}

      <Tab.Screen name="Buyer Promises" component={PaysofterPromiseBuyer} />

      {userInfo && profile?.is_seller && (
        <>
          {/* <Tab.Screen name="Seller Promises" component={PaysofterPromiseSeller} /> */}
        </>
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tapContainer: {
    padding: 10,
  },
  msgCounter: {
    fontSize: 14,
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "red",
  },
});
