import axios from "axios";
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL, 
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL, 
  LIST_ALL_PAYMENTS_REQUEST,
  LIST_ALL_PAYMENTS_SUCCESS,
  LIST_ALL_PAYMENTS_FAIL,
} from "../constants/paymentConstants";

import { API_URL } from "../../config/apiConfig";

export const createPayment = (paymentData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_CREATE_REQUEST,
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

    const { data } = await axios.post(
      `${API_URL}/api/create-payment/`,
      paymentData,
      config
    );

    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
    window.location.reload();
    window.location.href = "/dashboard";
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-payments/`,
      config
    );

    dispatch({
      type: PAYMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllPaymentsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ALL_PAYMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-payments/`,
      config
    );

    dispatch({
      type: LIST_ALL_PAYMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ALL_PAYMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
