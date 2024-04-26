// transactionReducers.js
import {
  USER_TRANSACTION_REQUEST,
  USER_TRANSACTION_SUCCESS,
  USER_TRANSACTION_FAIL,

  TRANSACTION_CREATE_REQUEST,
TRANSACTION_CREATE_SUCCESS,
TRANSACTION_CREATE_FAIL,
} from "../constants/transactionConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  transactions: [],
};

export const userTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case USER_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case USER_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
