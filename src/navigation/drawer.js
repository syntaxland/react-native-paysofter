// drawer.js
import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  HomeStack,
  // UserDashboardStack,
  // HomeTabsStack,
} from "./stack";
import { HomeTabs } from "./tabs";
import { useSelector, useDispatch } from "react-redux";
import {
  useNavigation,
  // useRoute
} from "@react-navigation/native";
// import { styles } from "./screens/screenStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDashboard,
  faUser,
  faUserLock,
  faUserShield,
  faHandPeace,
  faUserPlus,
  faSackDollar,
  faMessage,
  faHeart,
  faEye,
  faThumbsUp,
  faComments,
  faTicket,
  faGear,
  faAd,
  faLink,
  faMoneyBill,
  faSignIn,
  faSignInAlt,
  faSignOut,
  faCaretDown,
  faUserCheck,
  faCodeCompare,
  faBullhorn,
  faCreditCard,
  faCreditCardAlt,
  faMoneyBill1,
  faDollarSign,
  faMoneyBills,
  faCode,

  // faSackDollar
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../redux/actions/userActions";
import { getUserProfile } from "../redux/actions/userProfileActions";
// import { getUserMessages } from "../redux/actions/messagingActions";
// import {
//   GetActiveBuyerFreeAdMessages,
//   GetActiveBuyerPaidAdMessages,
//   listBuyerFreeAdMessages,
//   listBuyerPaidAdMessages,
// } from "../redux/actions/marketplaceSellerActions";
// import {
//   listSupportTicket,
//   listAllSupportTickets,
// } from "../redux/actions/supportActions";
import AccountDetails from "../components/profiles/AccountDetails";

const Drawer = createDrawerNavigator();

export const MyDrawer = (props) => {
  return (
    <>
      <SafeAreaProvider>
        <Drawer.Navigator
          // initialRouteName="Home"
          // screenOptions={{ headerShown: false }}

          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: "#0f172a",
            drawerInactiveTintColor: "#fff",
            drawerStyle: {
              backgroundColor: "#0f172a",
            },
          }}
          drawerContent={(props) => (
            <View style={{ flex: 1, backgroundColor: "#0f172a" }}>
              <CustomDrawerContent {...props} />
            </View>
          )}
        >
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: "Home",
            }}
          />

          {/* <Drawer.Screen
            name="HomeTabs"
            component={HomeTabsStack}
            options={{ drawerLabel: "" }}
          /> */}

          <Drawer.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ drawerLabel: "Home" }}
          />
        </Drawer.Navigator>
      </SafeAreaProvider>
    </>
  );
};

export const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const route = useRoute();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [greeting, setGreeting] = useState("");
  const [showCreditPointLinks, setShowCreditPointLinks] = useState(false);
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  const toggleCreditPointLinks = () => {
    setShowCreditPointLinks(!showCreditPointLinks);
  };

  const toggleAdminLinks = () => {
    setShowAdminLinks(!showAdminLinks);
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      // dispatch(getUserMessages());
      // dispatch(GetActiveBuyerFreeAdMessages());
      // dispatch(GetActiveBuyerPaidAdMessages());
      // dispatch(listBuyerFreeAdMessages());
      // dispatch(listBuyerPaidAdMessages());
      // dispatch(listSupportTicket());
      // dispatch(listAllSupportTickets());
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
  // const listBuyerFreeAdMessagesState = useSelector(
  //   (state) => state.listBuyerFreeAdMessagesState
  // );
  // const { freeAdMessages } = listBuyerFreeAdMessagesState;

  // const listBuyerPaidAdMessagesState = useSelector(
  //   (state) => state.listBuyerPaidAdMessagesState
  // );
  // const { paidAdMessages } = listBuyerPaidAdMessagesState;

  // const msgFreeAdCounted = freeAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.seller_free_ad_msg_count,
  //   0
  // );

  // const msgPaidAdCounted = paidAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.seller_paid_ad_msg_count,
  //   0
  // );

  // const GetActiveBuyerFreeAdMessageState = useSelector(
  //   (state) => state.GetActiveBuyerFreeAdMessageState
  // );
  // const { activeBuyerFreeAdMessages } = GetActiveBuyerFreeAdMessageState;

  // const GetActiveBuyerPaidAdMessageState = useSelector(
  //   (state) => state.GetActiveBuyerPaidAdMessageState
  // );
  // const { activeBuyerPaidAdMessages } = GetActiveBuyerPaidAdMessageState;

  // const msgActiveFreeAdCounted = activeBuyerFreeAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.buyer_free_ad_msg_count,
  //   0
  // );

  // const msgActivePaidAdCounted = activeBuyerPaidAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.buyer_paid_ad_msg_count,
  //   0
  // );

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

  // const totalMsgCount =
  //   msgCounted +
  //   msgPaidAdCounted +
  //   msgFreeAdCounted +
  //   msgActiveFreeAdCounted +
  //   msgActivePaidAdCounted;

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const getLabelStyle = (currentRoute) => {
  // const route = useRoute();
  //   return route.name === currentRoute
  //     ? [styles.drawerItemLabel, styles.activeDrawerItemLabel]
  //     : styles.drawerItemLabel;
  // };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.greetingContainer}>
        <View style={styles.drawerItemContainer}>
          <Text style={styles.greetingText}>
            {userInfo
              ? `${greeting}, ${
                  userInfo.first_name.charAt(0).toUpperCase() +
                  userInfo.first_name.slice(1)
                }!`
              : `${greeting}!`}
          </Text>
          <FontAwesomeIcon
            color={styles.greetingIconColor}
            icon={faHandPeace}
            size={styles.iconSize}
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.accountContainer}>
        <AccountDetails />
      </View>

      {userInfo && (
        <View style={styles.drawerContainer}>
          <Text style={styles.title}>User Metrics</Text>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faHome}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Home"
              onPress={() => navigation.navigate("Home")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faDashboard}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Dashboard"
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
              // labelStyle={getLabelStyle("Dashboard")}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faUser}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Profile"
              onPress={() => navigation.navigate("Profile")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faUserPlus}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Referrals"
              onPress={() => navigation.navigate("Referrals")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faSackDollar}
              size={styles.iconSize}
              style={styles.icon}
            />

            <TouchableOpacity
              onPress={toggleCreditPointLinks}
              style={styles.toggleContainer}
            >
              <DrawerItem
                label="Accont Funds"
                onPress={toggleCreditPointLinks}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
              <FontAwesomeIcon
                color={styles.iconColor}
                icon={faCaretDown}
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          </View>

          {showCreditPointLinks && (
            <>
              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Fund Credits (NGN)"
                  onPress={() => navigation.navigate("Fund Credits (NGN)")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Fund Credits (USD)"
                  onPress={() => navigation.navigate("Fund Credits (USD)")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Fund Debits (NGN)"
                  onPress={() => navigation.navigate("Fund Debits (NGN)")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Fund Debits (USD)"
                  onPress={() => navigation.navigate("Fund Debits (USD)")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>
            </>
          )}

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faCreditCard}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Paysofter Promise"
              onPress={() => navigation.navigate("Paysofter Promise")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faMoneyBill1}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Paysofter Across"
              onPress={() => navigation.navigate("Paysofter Across")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faMessage}
              size={styles.iconSize}
              style={styles.icon}
            />

            <View style={styles.inboxContainer}>
              <DrawerItem
                label="Inbox"
                onPress={() => navigation.navigate("Inbox")}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
              {/* <Text>
                {totalMsgCount > 0 && (
                  <Text style={styles.msgCounter}>{totalMsgCount}</Text>
                )}
              </Text> */}
            </View>
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faComments}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Feedback"
              onPress={() => navigation.navigate("Feedback")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faTicket}
              size={styles.iconSize}
              style={styles.icon}
            />

            <View style={styles.inboxContainer}>
              <DrawerItem
                label="Support"
                onPress={() => navigation.navigate("Support")}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
              {/* <Text>
                {supportMsgCounted > 0 && (
                  <Text style={styles.msgCounter}>{supportMsgCounted}</Text>
                )}
              </Text> */}
            </View>
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faGear}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Settings"
              onPress={() => navigation.navigate("Settings")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>
        </View>
      )}

      {userInfo && (
        <View style={styles.drawerContainer}>
          {!profile?.is_seller ? (
            <View style={styles.drawerItemContainer}>
              <FontAwesomeIcon
                color={styles.iconColor}
                icon={faDashboard}
                size={styles.iconSize}
                style={styles.icon}
              />
              <DrawerItem
                label="Create Seller Account"
                onPress={() => navigation.navigate("Create Seller Account")}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
            </View>
          ) : (
            <>
              <Text style={styles.title}>Seller Aspect</Text>
              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faDashboard}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Dashboard (Seller)"
                  onPress={() => navigation.navigate("Dashboard (Seller)")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faUserShield}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Business Profile"
                  onPress={() => navigation.navigate("Business Profile")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faCreditCard}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Paysofter Promise"
                  onPress={() => navigation.navigate("Paysofter Promise")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faDollarSign}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Transactions"
                  onPress={() => navigation.navigate("Transactions")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faMoneyBills}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Payouts"
                  onPress={() => navigation.navigate("Payouts")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faCode}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="API EndPoints"
                  onPress={() => navigation.navigate("API EndPoints")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faLink}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="SDK & Webhooks"
                  onPress={() => navigation.navigate("SDK & Webhooks")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>
            </>
          )}
        </View>
      )}

      {userInfo && (profile?.is_superuser || profile?.is_staff) && (
        <View style={styles.drawerContainer}>
          <Text style={styles.title}>Admin Area</Text>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faUserLock}
              size={styles.iconSize}
              style={styles.icon}
            />

            <TouchableOpacity
              onPress={toggleAdminLinks}
              style={styles.toggleContainer}
            >
              <DrawerItem
                label="Admin"
                onPress={toggleAdminLinks}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
              <FontAwesomeIcon
                color={styles.iconColor}
                icon={faCaretDown}
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          </View>

          {showAdminLinks && (
            <>
              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faTicket}
                  size={styles.iconSize}
                  style={styles.icon}
                />

                <View style={styles.inboxContainer}>
                  <DrawerItem
                    label="Support Tickets"
                    onPress={() => navigation.navigate("Admin Support")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                  {/* <Text>
                    {adminSupportMsgCounted > 0 && (
                      <Text style={styles.msgCounter}>
                        {adminSupportMsgCounted}
                      </Text>
                    )}
                  </Text> */}
                </View>
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faComments}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Feedbacks"
                  onPress={() => navigation.navigate("Admin Feedback")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faCodeCompare}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Testing"
                  onPress={() => navigation.navigate("Testing")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>
            </>
          )}
        </View>
      )}

      <DrawerItem
        label={() => (
          <Text style={styles.accountStyle}>
            {userInfo ? (
              <Text style={styles.logoutStyle}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignOut}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Logout
              </Text>
            ) : (
              <Text>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignIn}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Login
              </Text>
            )}
          </Text>
        )}
        onPress={() => {
          if (userInfo) {
            logoutHandler();
          } else {
            navigation.navigate("Login");
          }
        }}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />

      <DrawerItem
        label={() => (
          <Text style={styles.accountStyle}>
            {userInfo ? (
              <Text></Text>
            ) : (
              <Text>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignInAlt}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Register
              </Text>
            )}
          </Text>
        )}
        onPress={() => {
          if (!userInfo) {
            navigation.navigate("Register");
          }
        }}
        style={styles.accountStyle}
        // style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    paddingVertical: 15,
    color: "#fff",
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 5,
    color: "#fff",
  },
  accountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  drawerItem: {
    color: "#cbd5e1",
    flex: 1,
  },
  accountStyle: {
    color: "#007bff",
  },
  logoutStyle: {
    color: "#dc3545",
  },
  drawerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemLabel: {
    color: "#cbd5e1",
  },
  activeDrawerItemLabel: {
    color: "blue",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 1,
  },
  iconSize: 14,
  iconColor: "#cbd5e1",
  greetingIconColor: "#fff",
  toggleIcon: {
    marginLeft: "auto",
    padding: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  inboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
