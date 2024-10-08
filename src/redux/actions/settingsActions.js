// actions/settingsActions.js
import axios from "../../axiosConfig";
import {
  SELECT_CURRENCY_REQUEST,
  SELECT_CURRENCY_SUCCESS,
  SELECT_CURRENCY_FAIL,
  RESET_SELECT_CURRENCY_STATE,
  // GET_SELECTED_CURRENCY_REQUEST,
  // GET_SELECTED_CURRENCY_SUCCESS,
  // GET_SELECTED_CURRENCY_FAIL,
} from "../constants/settingsConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const selecteCurrency = (currencyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELECT_CURRENCY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/select-currency/`,
      currencyData,
      config
    );

    dispatch({
      type: SELECT_CURRENCY_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: SELECT_CURRENCY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetSelectCurrencytState = () => (dispatch) => {
    dispatch({ type: RESET_SELECT_CURRENCY_STATE });
};
