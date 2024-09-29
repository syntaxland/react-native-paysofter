// logoutAction.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../../navigation/navigationRef";
import { USER_LOGOUT } from "../constants/userConstants";

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  navigationRef.navigate("Login"); 
};
