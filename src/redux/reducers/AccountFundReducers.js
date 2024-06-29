// AccountFundReducers.js
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

const initialState = {
  loading: false,
  success: false,
  error: null,
  accountFunds: [],
  accountFund: [],
  accountFundBalance: [],
  usdFundBalance: [],
  formattedEmail: [],
};

export const setMaxUsdFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_USD_FUND_WITHDRAWAL_REQUEST:
      return { loading: true };
    case SET_MAX_USD_FUND_WITHDRAWAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SET_MAX_USD_FUND_WITHDRAWAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserUsdAccountFundCreditsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_USD_FUND_ACCOUNT_CREDITS_REQUEST:
      return { loading: true };
    case GET_USER_USD_FUND_ACCOUNT_CREDITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_USD_FUND_ACCOUNT_CREDITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserUsdAccountFundDebitsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_USD_FUND_ACCOUNT_DEBITS_REQUEST:
      return { loading: true };
    case GET_USER_USD_FUND_ACCOUNT_DEBITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_USD_FUND_ACCOUNT_DEBITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fundUsdAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FUND_USD_ACCOUNT_REQUEST:
      return { loading: true };
    case USER_FUND_USD_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_FUND_USD_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case RESET_USER_USD_FUND_ACCOUNT_STATE:
      return {};
    default:
      return state;
  }
};

export const toggleUsdAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_USD_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case TOGGLE_USD_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TOGGLE_USD_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    case RESET_TOGGLE_USD_ACCCOUNT_FUND_STATE:
      return {};
    default:
      return state;
  }
};

export const getUserUsdAccountFundBalanceReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_USD_ACCOUNT_FUND_BALANCE_REQUEST:
      return { loading: true };
    case GET_USER_USD_ACCOUNT_FUND_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        usdFundBalance: action.payload,
      };
    case GET_USER_USD_ACCOUNT_FUND_BALANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const activateAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ACTIVATE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllAccountFundBalanceReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_All_ACCOUNT_FUND_BALANCE_REQUEST:
      return { loading: true };
    case GET_All_ACCOUNT_FUND_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_All_ACCOUNT_FUND_BALANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAccountFundDebitsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_FUND_ACCOUNT_DEBITS_REQUEST:
      return { loading: true };
    case GET_USER_FUND_ACCOUNT_DEBITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_FUND_ACCOUNT_DEBITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserAccountFundCreditsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_FUND_ACCOUNT_CREDITS_REQUEST:
      return { loading: true };
    case GET_USER_FUND_ACCOUNT_CREDITS_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case GET_USER_FUND_ACCOUNT_CREDITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const disableAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case DISABLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedEmail: action.payload.formattedEmail,
      };
    case DISABLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const verifyOtpAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedEmail: action.payload.formattedEmail,
      };
    case VERIFY_OTP_DISABLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toggleAccountFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACCCOUNT_FUND_REQUEST:
      return { loading: true };
    case TOGGLE_ACCCOUNT_FUND_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case TOGGLE_ACCCOUNT_FUND_FAIL:
      return { loading: false, error: action.payload };
    case RESET_TOGGLE_ACCCOUNT_FUND_STATE:
      return {};
    default:
      return state;
  }
};

export const setMaxFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAX_FUND_WITHDRAWAL_REQUEST:
      return { loading: true };
    case SET_MAX_FUND_WITHDRAWAL_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case SET_MAX_FUND_WITHDRAWAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fundAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FUND_ACCOUNT_REQUEST:
      return { loading: true };
    case USER_FUND_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case USER_FUND_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    case RESET_USER_FUND_ACCOUNT_STATE:
      return {};
    default:
      return state;
  }
};

export const getUserAccountBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT_FUND_BALANCE_REQUEST:
      return { loading: true };
    case USER_ACCOUNT_FUND_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFundBalance: action.payload,
      };
    case USER_ACCOUNT_FUND_BALANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAccountFundListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT_FUND_LIST_REQUEST:
      return { loading: true };
    case USER_ACCOUNT_FUND_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        accountFunds: action.payload,
      };
    case USER_ACCOUNT_FUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
