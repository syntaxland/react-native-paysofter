// stack.js
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import { HomeTabs } from "./tabs";
// screens
// import HomeScreen from "../components/screens/HomeScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
// FundAccount
import UsdAccountFundCredits from "../components/FundAccount/UsdAccountFundCredits";
import AccountFundCredits from "../components/FundAccount/AccountFundCredits";
import AccountFundDebits from "../components/FundAccount/AccountFundDebits";
import UsdAccountFundDebits from "../components/FundAccount/UsdAccountFundDebits";
// import GetSellFundAccount from "../components/FundAccount/GetSellFundAccount";
// sellers
import ApiEndPoints from "../components/sellers/ApiEndPoints";
import Webhooks from "../components/sellers/Webhooks";
import Transactions from "../components/sellers/Transactions";
import Payouts from "../components/sellers/Payouts";
import DashboardSeller from "../components/sellers/DashboardSeller";
import CreateSellerAccount from "../components/sellers/CreateSellerAccount";
import CreateBusinessStatus from "../components/sellers/CreateBusinessStatus";
import BusinessOwnerDetail from "../components/sellers/BusinessOwnerDetail";
import SellerBankAccount from "../components/sellers/SellerBankAccount";
import SellerBvn from "../components/sellers/SellerBvn";
import SellerPhoto from "../components/sellers/SellerPhoto";
import SellerProfile from "../components/sellers/SellerProfile";
import PaysofterPromiseSeller from "../components/sellers/PaysofterPromiseSeller";
// profiles
import Dashboard from "../components/profiles/Dashboard";
import Referrals from "../components/profiles/Referrals";
import UserProfile from "../components/profiles/UserProfile";
import Inbox from "../components/profiles/Inbox";
import PaysofterPromiseBuyer from "../components/profiles/PaysofterPromiseBuyer";
// settings
import Settings from "../components/settings/Settings";
// promise
import BuyerPromiseMessage from "../components/promise/BuyerPromiseMessage";
// import BuyerPromiseMessage from "../components/promise/BuyerPromiseMessage";
// import BuyerPromiseMessage from "../components/promise/BuyerPromiseMessage";
// support
import SupportTicket from "../components/support/SupportTicket";
import CreateSupportTicket from "../components/support/CreateSupportTicket";
import UserReplySupportTicket from "../components/support/UserReplySupportTicket";
import AdminReplySupportTicket from "../components/support/AdminReplySupportTicket";
import FeedbackScreen from "../components/screens/FeedbackScreen";
import AdminFeedback from "../components/admin/AdminFeedback";
import Feedback from "../components/profiles/Feedback";
import AdminSupportTicket from "../components/admin/AdminSupportTicket";
import Testing from "../components/admin/Testing";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Paysofter" component={HomeTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Seller Dashboard" component={DashboardSeller} />
      <Stack.Screen name="Referrals" component={Referrals} />
      <Stack.Screen name="Settings" component={Settings} />
      {/*
       */}
      {/* AccountFund */}
      <Stack.Screen name="Fund Credits (NGN)" component={AccountFundCredits} />
      <Stack.Screen
        name="Fund Credits (USD)"
        component={UsdAccountFundCredits}
      />
      <Stack.Screen name="Fund Debits (NGN)" component={AccountFundDebits} />
      <Stack.Screen name="Fund Debits (USD)" component={UsdAccountFundDebits} />
      <Stack.Screen name="Buyer Promises" component={PaysofterPromiseBuyer} />
      <Stack.Screen name="Seller Promises" component={PaysofterPromiseSeller} />
      <Stack.Screen
        name="Buyer Promise Message"
        component={BuyerPromiseMessage}
      />

      <Stack.Screen name="Payouts" component={Payouts} />
      <Stack.Screen name="API EndPoints" component={ApiEndPoints} />
      <Stack.Screen name="Webhooks" component={Webhooks} />

      <Stack.Screen name="Create Seller Account" component={CreateSellerAccount} />
      <Stack.Screen name="Business Status" component={CreateBusinessStatus} />
      <Stack.Screen name="Business Details" component={BusinessOwnerDetail} />
      <Stack.Screen name="Seller Bank" component={SellerBankAccount} />
      <Stack.Screen name="Seller BVN" component={SellerBvn} />
      <Stack.Screen name="Seller Photo" component={SellerPhoto} />
      <Stack.Screen name="Business Profile" component={SellerProfile} />

      <Stack.Screen name="Support" component={SupportTicket} />
      <Stack.Screen name="Create Ticket" component={CreateSupportTicket} />
      <Stack.Screen
        name="User Reply Ticket"
        component={UserReplySupportTicket}
      />
      <Stack.Screen
        name="Admin Reply Ticket"
        component={AdminReplySupportTicket}
      />
      <Stack.Screen name="Admin Support" component={AdminSupportTicket} />
      <Stack.Screen name="Send Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Admin Feedback" component={AdminFeedback} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Testing" component={Testing} />
    </Stack.Navigator>
  );
};
