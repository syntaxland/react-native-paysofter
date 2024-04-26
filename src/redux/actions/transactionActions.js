// transactionActions.js
import axios from "axios";
import { 
  USER_TRANSACTION_REQUEST,
  USER_TRANSACTION_SUCCESS,
  USER_TRANSACTION_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
} from "../constants/transactionConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const getUserTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_TRANSACTION_REQUEST,
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
      `${API_URL}/api/get-user-transactions/`,
      config
    );

    dispatch({
      type: USER_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_TRANSACTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createTransaction =
  (transactionData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_CREATE_REQUEST,
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
        `${API_URL}/api/buyer-confirm-promise/`,
        transactionData,
        config
      );

      dispatch({
        type: TRANSACTION_CREATE_SUCCESS,
        payload: data,
      });
      // window.location.href = "/dashboard";
      // window.location.reload();
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
