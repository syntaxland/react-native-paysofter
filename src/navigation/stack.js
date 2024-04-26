// stack.js
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/screens/HomeScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
import { navOptions } from "./options";
import { useNavigation } from "@react-navigation/native";
// import Dashboard from "../components/profiles/Dashboard";
// import { HomeTabs } from "./taps";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      {/* <Stack.Screen name="Home" component={HomeTabs} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Shipment" component={ShipmentScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} /> */}
    </Stack.Navigator>
  );
};

export const UserDashboardStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
    </Stack.Navigator>
  );
};
