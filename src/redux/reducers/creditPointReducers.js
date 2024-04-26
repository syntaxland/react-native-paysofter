// creditPointReducers.js
import {
  CREDIT_POINT_REQUEST_CREATE_REQUEST,
  CREDIT_POINT_REQUEST_CREATE_SUCCESS,
  CREDIT_POINT_REQUEST_CREATE_FAIL,
  CREDIT_POINT_LIST_REQUEST,
  CREDIT_POINT_LIST_SUCCESS,
  CREDIT_POINT_LIST_FAIL,
  CREDIT_POINT_ALL_LIST_REQUEST, 
  CREDIT_POINT_ALL_LIST_SUCCESS,
  CREDIT_POINT_ALL_LIST_FAIL,
  CREDIT_POINT_BALANCE_REQUEST,
  CREDIT_POINT_BALANCE_SUCCESS,
  CREDIT_POINT_BALANCE_FAIL,
  GET_USER_CREDIT_POINT_PAYMENTS_REQUEST,
  GET_USER_CREDIT_POINT_PAYMENTS_SUCCESS,
  GET_USER_CREDIT_POINT_PAYMENTS_FAIL,
  GET_ALL_CREDIT_POINT_PAYMENTS_REQUEST,
  GET_ALL_CREDIT_POINT_PAYMENTS_SUCCESS,
  GET_ALL_CREDIT_POINT_PAYMENTS_FAIL,
  CREDIT_POINT_EARNINGS_REQUEST,
  CREDIT_POINT_EARNINGS_SUCCESS,
  CREDIT_POINT_EARNINGS_FAIL,
} from "../constants/creditPointConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  creditPointRequest: [],
  creditPointRequests: [],
  creditPointAllRequests: [],
  creditPointBalance: [],
  creditPointPayments: [],
  creditPointAllPayments: [],

  creditPointEarnings: [],
};

export const creditPointRequestCreateReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREDIT_POINT_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case CREDIT_POINT_REQUEST_CREATE_SUCCESS:
      //   return { loading: false, success: true, creditPointRequest: action.payload };
      return {
        loading: false,
        success: true,
        creditPointRequest: action.payload,
      };

    case CREDIT_POINT_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_LIST_SUCCESS:
      return { ...state, loading: false, creditPointRequests: action.payload };
    case CREDIT_POINT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointAllListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_ALL_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_ALL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        creditPointAllRequests: action.payload,
      };
    case CREDIT_POINT_ALL_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_BALANCE_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_BALANCE_SUCCESS:
      return { ...state, loading: false, creditPointBalance: action.payload };
    case CREDIT_POINT_BALANCE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointEarningsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_EARNINGS_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_EARNINGS_SUCCESS:
      return { ...state, loading: false, creditPointEarnings: action.payload };
    case CREDIT_POINT_EARNINGS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCreditPointPaymentsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_USER_CREDIT_POINT_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_USER_CREDIT_POINT_PAYMENTS_SUCCESS:
      return { ...state, loading: false, creditPointPayments: action.payload };
    case GET_USER_CREDIT_POINT_PAYMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allCreditPointPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CREDIT_POINT_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CREDIT_POINT_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        creditPointAllPayments: action.payload,
      };
    case GET_ALL_CREDIT_POINT_PAYMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
