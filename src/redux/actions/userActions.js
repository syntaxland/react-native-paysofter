//userActions.js
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  UPDATE_USER_LAST_LOGIN_REQUEST,
  UPDATE_USER_LAST_LOGIN_SUCCESS,
  UPDATE_USER_LAST_LOGIN_FAIL,
} from "../constants/userConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import axios from "../../axiosConfig";

import { API_URL } from "../../config/apiConfig";

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/user-login/`,
      loginData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    await AsyncStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserLastLogin = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_LAST_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/update-user-last-login/`,
      loginData,
      config
    );

    dispatch({
      type: UPDATE_USER_LAST_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_LAST_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loginWithGoogle =
  (email, googleId, tokenId) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/google-login/`,
        { email, google_id: googleId, token_id: tokenId },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      // localStorage.setItem("userInfo", JSON.stringify(data));
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/user-register/`,
      formData,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("registrationData", JSON.stringify(formData));
    // await AsyncStorage.setItem("registrationData", JSON.stringify(formData));
    // window.location.reload();
    // window.location.href = "/verify-email-otp";
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/token/refresh/`,
      { refresh: refreshToken },
      config
    );

    // Update the access token in Axios headers
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    // Update the access token in Axios headers
    // axiosInstance.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${data.access}`;

    // Save the new access token in local storage
    // localStorage.setItem("userInfo", JSON.stringify(data));
    await AsyncStorage.setItem("userInfo", JSON.stringify(data));

    // Set timer to refresh the access token again after refreshTokenTime minutes (ms)
    // let refreshTokenTime = 1000 * 60 * 900; // ms * hr * mins
    let refreshTokenTime = 1000 * 60 * 60 * 24 * 7; // ms * hr * mins
    setTimeout(() => {
      dispatch(refreshToken(data.refresh));
    }, refreshTokenTime);
  } catch (error) {
    console.log("Error refreshing token:", error);
    // Handle token expiration here
    if (error.response && error.response.status === 401) {
      // Token has expired, redirect the user to the login page
      dispatch(logout());
      // window.location.href = "/login";
    } else {
      // Handle other errors or log out the user if token refresh fails
      dispatch(logout());
      // window.location.href = "/login";
    }
    // Handle error or logout the user if token refresh fails
    // dispatch(logout());
  }
};

export const logout = () => async (dispatch) => {
  try {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // await AsyncStorage.setItem("userInfo", JSON.stringify(data));
    // const { userLogin: { userInfo }, } = getState();
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${userInfo.access}`,
    //   },
    // };
    // Blacklist the access token on logout
    // await axios.post(
    //   `${API_URL}/api/users/logout/`,
    //   { refresh: userInfo.refresh },
    //   config
    // );
  } catch (error) {
    console.log("Error logging out:", error);
  }
  await AsyncStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
