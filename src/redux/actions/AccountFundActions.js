// AccountFundActions.js
import axios from "../../axiosConfig";
import {
  USER_FUND_ACCOUNT_REQUEST,
  USER_FUND_ACCOUNT_SUCCESS,
  USER_FUND_ACCOUNT_FAIL,
  RESET_USER_FUND_ACCOUNT_STATE,
  USER_ACCOUNT_FUND_BALANCE_REQUEST,
  USER_ACCOUNT_FUND_BALANCE_SUCCESS,  
  USER_ACCOUNT_FUND_BALANCE_FAIL,
  USER_ACCOUNT_FUND_LIST_REQUEST,
  USER_ACCOUNT_FUND_LIST_SUCCESS,
  USER_ACCOUNT_FUND_LIST_FAIL,
  SET_MAX_FUND_WITHDRAWAL_REQUEST,
  SET_MAX_FUND_WITHDRAWAL_SUCCESS,
  SET_MAX_FUND_WITHDRAWAL_FAIL,
  TOGGLE_ACCCOUNT_FUND_REQUEST,
  TOGGLE_ACCCOUNT_FUND_SUCCESS,
  TOGGLE_ACCCOUNT_FUND_FAIL,
  RESET_TOGGLE_ACCCOUNT_FUND_STATE,
  DISABLE_ACCCOUNT_FUND_REQUEST,
  DISABLE_ACCCOUNT_FUND_SUCCESS,
  DISABLE_ACCCOUNT_FUND_FAIL,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS,
  VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL,
  GET_USER_FUND_ACCOUNT_DEBITS_REQUEST,
  GET_USER_FUND_ACCOUNT_DEBITS_SUCCESS,
  GET_USER_FUND_ACCOUNT_DEBITS_FAIL,
  GET_USER_FUND_ACCOUNT_CREDITS_REQUEST,
  GET_USER_FUND_ACCOUNT_CREDITS_SUCCESS,
  GET_USER_FUND_ACCOUNT_CREDITS_FAIL,
  GET_All_ACCOUNT_FUND_BALANCE_REQUEST,
  GET_All_ACCOUNT_FUND_BALANCE_SUCCESS,
  GET_All_ACCOUNT_FUND_BALANCE_FAIL,
  ADMIN_ACTIVATE_ACCCOUNT_FUND_REQUEST,
  ADMIN_ACTIVATE_ACCCOUNT_FUND_SUCCESS,
  ADMIN_ACTIVATE_ACCCOUNT_FUND_FAIL,
  GET_USER_USD_ACCOUNT_FUND_BALANCE_REQUEST,
  GET_USER_USD_ACCOUNT_FUND_BALANCE_SUCCESS,
  GET_USER_USD_ACCOUNT_FUND_BALANCE_FAIL,
  TOGGLE_USD_ACCCOUNT_FUND_REQUEST,
  TOGGLE_USD_ACCCOUNT_FUND_SUCCESS,
  TOGGLE_USD_ACCCOUNT_FUND_FAIL,
  RESET_TOGGLE_USD_ACCCOUNT_FUND_STATE,
  USER_FUND_USD_ACCOUNT_REQUEST,
  USER_FUND_USD_ACCOUNT_SUCCESS,
  USER_FUND_USD_ACCOUNT_FAIL,
  RESET_USER_USD_FUND_ACCOUNT_STATE,
  GET_USER_USD_FUND_ACCOUNT_CREDITS_REQUEST,
  GET_USER_USD_FUND_ACCOUNT_CREDITS_SUCCESS,
  GET_USER_USD_FUND_ACCOUNT_CREDITS_FAIL,
  GET_USER_USD_FUND_ACCOUNT_DEBITS_REQUEST,
  GET_USER_USD_FUND_ACCOUNT_DEBITS_SUCCESS,
  GET_USER_USD_FUND_ACCOUNT_DEBITS_FAIL,
  SET_MAX_USD_FUND_WITHDRAWAL_REQUEST,
  SET_MAX_USD_FUND_WITHDRAWAL_SUCCESS,
  SET_MAX_USD_FUND_WITHDRAWAL_FAIL,
} from "../constants/AccountFundConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const setMaxUsdWithdrawal =
  (amountData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_MAX_USD_FUND_WITHDRAWAL_REQUEST,
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
        `${API_URL}/api/set-maximum-usd-withdrawal/`,
        amountData,
        config
      );

      dispatch({
        type: SET_MAX_USD_FUND_WITHDRAWAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SET_MAX_USD_FUND_WITHDRAWAL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserUsdAccountFundCredits =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USER_USD_FUND_ACCOUNT_CREDITS_REQUEST });

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
        `${API_URL}/api/get-user-usd-account-fund-credits/`,
        config
      );

      dispatch({
        type: GET_USER_USD_FUND_ACCOUNT_CREDITS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_USD_FUND_ACCOUNT_CREDITS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserUsdAccountFundDebits = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_USD_FUND_ACCOUNT_DEBITS_REQUEST });

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
      `${API_URL}/api/get-user-usd-account-fund-debits/`,
      config
    );

    dispatch({ type: GET_USER_USD_FUND_ACCOUNT_DEBITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_USD_FUND_ACCOUNT_DEBITS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fundUserUsdAccount = (fundData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FUND_USD_ACCOUNT_REQUEST,
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
      `${API_URL}/api/fund-user-usd-account/`,
      fundData,
      config
    );

    dispatch({
      type: USER_FUND_USD_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FUND_USD_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetFundUserUsdAccount = () => (dispatch) => {
  dispatch({ type: RESET_USER_USD_FUND_ACCOUNT_STATE });
};

export const toggleUsdAccountFund =
  (toggleData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOGGLE_USD_ACCCOUNT_FUND_REQUEST,
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
        `${API_URL}/api/toggle-usd-account/`,
        toggleData,
        config
      );

      dispatch({
        type: TOGGLE_USD_ACCCOUNT_FUND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOGGLE_USD_ACCCOUNT_FUND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetToggleUsdAccountFundState = () => (dispatch) => {
  dispatch({ type: RESET_TOGGLE_USD_ACCCOUNT_FUND_STATE });
};

export const getUserUsdAccountFundBalance =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_USD_ACCOUNT_FUND_BALANCE_REQUEST,
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
        `${API_URL}/api/get-user-usd-account_fund-balance/`,
        config
      );

      dispatch({
        type: GET_USER_USD_ACCOUNT_FUND_BALANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_USD_ACCOUNT_FUND_BALANCE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const activateAccountFund =
  (fundAccountData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_ACTIVATE_ACCCOUNT_FUND_REQUEST,
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
        `${API_URL}/api/activate-account-fund/`,
        fundAccountData,
        config
      );

      dispatch({
        type: ADMIN_ACTIVATE_ACCCOUNT_FUND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ACTIVATE_ACCCOUNT_FUND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getAllAccountFundBalance = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_All_ACCOUNT_FUND_BALANCE_REQUEST,
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
      `${API_URL}/api/get-all-account-fund-balance/`,
      config
    );

    dispatch({
      type: GET_All_ACCOUNT_FUND_BALANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_All_ACCOUNT_FUND_BALANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fundUserAccount =
  (fundAccountData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_FUND_ACCOUNT_REQUEST,
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
        `${API_URL}/api/fund-user-account/`,
        fundAccountData,
        config
      );

      dispatch({
        type: USER_FUND_ACCOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FUND_ACCOUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetFundUserAccount = () => (dispatch) => {
  dispatch({ type: RESET_USER_FUND_ACCOUNT_STATE });
};

export const getUserAccountFundDebits = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_FUND_ACCOUNT_DEBITS_REQUEST });

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
      `${API_URL}/api/get-user-account-fund-debits/`,
      config
    );

    dispatch({ type: GET_USER_FUND_ACCOUNT_DEBITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FUND_ACCOUNT_DEBITS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserAccountFundCredits = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_FUND_ACCOUNT_CREDITS_REQUEST });

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
      `${API_URL}/api/get-user-account-fund-credits/`,
      config
    );

    dispatch({ type: GET_USER_FUND_ACCOUNT_CREDITS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FUND_ACCOUNT_CREDITS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setMaxWithdrawal = (amountData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_REQUEST,
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
      `${API_URL}/api/set-maximum-withdrawal/`,
      amountData,
      config
    );

    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_MAX_FUND_WITHDRAWAL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const toggleAccountFund = (toggleData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_REQUEST,
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
      `${API_URL}/api/toggle-activate-account/`,
      toggleData,
      config
    );

    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_ACCCOUNT_FUND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetToggleAccountFundState = () => (dispatch) => {
  dispatch({ type: RESET_TOGGLE_ACCCOUNT_FUND_STATE });
};

export const disableAccountFund = (amountData) => async (dispatch) => {
  try {
    dispatch({
      type: DISABLE_ACCCOUNT_FUND_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/send-otp-account-disable/`,
      amountData,
      config
    );

    dispatch({
      type: DISABLE_ACCCOUNT_FUND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISABLE_ACCCOUNT_FUND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const verifyOtpDisableAccountFund =
  (otpData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/verify-account-fund-disable/`,
        otpData,
        config
      );

      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserAccountFundBalance = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_REQUEST,
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
      `${API_URL}/api/get-user-acount-balance/`,
      config
    );

    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNT_FUND_BALANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userAccountFundList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ACCOUNT_FUND_LIST_REQUEST,
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
      `${API_URL}/api/user-account-funds/`,
      config
    );

    dispatch({
      type: USER_ACCOUNT_FUND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNT_FUND_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
