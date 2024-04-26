// payoutActions.js
import axios from "axios";
import {
  USER_PAYOUT_REQUEST,
  USER_PAYOUT_SUCCESS,
  USER_PAYOUT_FAIL,
} from "../constants/payoutConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const getUserPayouts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PAYOUT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-payouts/`,
      config
    );

    dispatch({
      type: USER_PAYOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PAYOUT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
